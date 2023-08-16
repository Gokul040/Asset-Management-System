import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { NetworkCallService } from 'src/app/networkcall.service';
import { genSaltSync, hashSync } from 'bcryptjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userName: any;
  userNumber: any;
  userEmail: any;
  role: any;
  userId?: number;
  image: any;

  // password:string='sfsf'
  profileForm: FormGroup;



  error_messages = {

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Enter Minimum 8 Characters.' },
      { type: 'maxlength', message: 'Enter below 16 characters.' }
    ],
  }


  constructor(
    public formBuilder: FormBuilder, private api: NetworkCallService
  ) {

    this.profileForm = this.formBuilder.group({

      email: window.sessionStorage.getItem('email'),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])),
    }, { validators: this.Mustmatch('password', 'confirmpassword') }
    )
  }
  ngOnInit(): void {
    this.getProfile();
    this.userName;
    this.userNumber;
    this.userEmail = window.sessionStorage.getItem('email');
  }
  hashPassword(password: string) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }

  Mustmatch(pass: any, conpass: any) {
    return (formGroup: FormGroup) => {
      const passctrl = formGroup.controls['password'];
      const conpassctrl = formGroup.controls['confirmpassword'];

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
    return this.profileForm.controls;
  }

  Password(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: false };
  }

  getProfile() {

    this.userEmail = window.sessionStorage.getItem('email');
    this.api.getProfileUser(this.userEmail)
      .subscribe({
        next: (res) => {
          this.userNumber = res.contact;
          this.userName = res.firstName;
          this.userEmail = res.email;
          this.role = res.role;
          this.userId = res.id;
          // alert("Product added successfully")
          // this.productForm.reset();
          // this.dialogRef.close('save');   
        }
      })
  }

  changePassword() {
    this.profileForm.value.password = this.hashPassword(this.profileForm.value.password);
    this.api.putPasswordProfileUser(this.profileForm.value).subscribe(
      {
        next: (res) => {
          window.alert(res)
        },
        error: () => {
          window.alert(error)
          console.log(this.profileForm.value)
        }

      }
    )
  }

  updateImg(imageid: string) {
    const id = this.userId;
    this.api.putUserImage(id!, imageid).subscribe({
      next: (res) => {
        window.alert(res)
      },
      error: () => {
        window.alert(error)
      }
    })
  }

}
