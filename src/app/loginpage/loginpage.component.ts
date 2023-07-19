import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NetworkCallService } from '../networkcall.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../security/token-storage.service';
import { genSaltSync, hashSync } from 'bcryptjs';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  title = 'Asset Management';
  public loginValid = true;
  passwordform: FormGroup;
  signInForm!: FormGroup;
  forgotForm!: FormGroup;
  confirmForm!: FormGroup;
  durationInSeconds = 5;
  newPassword!: string;

  isSignin: boolean = true;
  isforgotPassword: boolean = false;
  isConfirmPassword: boolean = false;
  token!: string;
  userRole?: string;
  private URLRegisteration: string = '';


  onSubmit() { }

  error_messages = {

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
    'newPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
  }

  constructor(
    public formbuilder: FormBuilder, private api: NetworkCallService, private router: Router, public httpClient: HttpClient
    , private _snackBar: MatSnackBar, private tokenStorage: TokenStorageService) {


    this.passwordform = this.formbuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      otp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
    }, { validators: this.Mustmatch('password', 'newPassword') }
    )
  }

  ngOnInit(): void {
    this.signInForms();
    this.forgotForms();

  }

  signInForms() {
    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  forgotForms() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }



  Mustmatch(pass: any, conpass: any) {
    return (formGroup: FormGroup) => {
      const passctrl = formGroup.controls['password'];
      const conpassctrl = formGroup.controls['newPassword'];

      if (conpassctrl.errors && !conpassctrl.errors['Mustmatch']) {
        return;
      }
      if (passctrl.value !== conpassctrl.value) {
        conpassctrl.setErrors({ Mustmatch: true });
      } else {
        conpassctrl.setErrors(null);
      }
    }
  }

  get f() {
    return this.passwordform.controls;
  }

  hashPassword(password: string) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }

  isforgot() {
    this.isSignin = false;
    this.isforgotPassword = true;
    this.isConfirmPassword = false;
  }
  isSigninpage() {
    this.isSignin = true;
    this.isforgotPassword = false;
    this.isConfirmPassword = false;
  }
  isConfirmPasswords() {
    this.isSignin = false;
    this.isforgotPassword = false;
    this.isConfirmPassword = true;
  }


  updateLogin() {

    if (this.signInForm.valid) {
      // this.signInForm.value.password = this.hashPassword(this.signInForm.value.password);
      // console.log(this.signInForm.value.password)

      this.api.postLogin(this.signInForm.value).subscribe(
        {
          next: (LoginData) => {
            const token = LoginData.token;
            const email = LoginData.email;
            const userRole = LoginData.role;
            const expiry = LoginData.ExpiryDate;
            this.tokenStorage.saveTokens(LoginData);
            this.tokenStorage.saveEmail(email);
            window.sessionStorage.setItem('userRole', userRole);
            window.sessionStorage.setItem('Expirydate', expiry)
            this.api._isLoggedIn$.next(true);
            this.router.navigate(['/adminManagement/adminDashboard']);

          },
          error: (error) => {
            this.openSnackBar("User Name Or Password not found", "Close")

          }
        });
    }

  } reloadPage() {
    window.location.reload();
  };


  forgotPassword() {
    this.passwordform.value.password = this.hashPassword(this.passwordform.value.password)
    if (this.forgotForm.valid) {
      this.api.postPassword(this.forgotForm.value).subscribe(
        forgotData => {

          this.isSignin = false;
          this.isforgotPassword = false;
          this.isConfirmPassword = true;
        },
        error => {
          window.alert("User Name not found")

        }
      );
    }
  }

  confirmPass() {
    if (this.passwordform.valid) {
      this.api.confirmPassword(this.passwordform.value).subscribe(
        confirmData => {

          window.alert("Your password reset Successfully")
          this.isSignin = true;
          this.isforgotPassword = false;
          this.isConfirmPassword = false;
        },
        error => {

          window.alert("Otp Expired or Enter Correct Email")

        }
      );
    }
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'
    });
  }


}


