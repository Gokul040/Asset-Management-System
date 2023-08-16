import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'jquery';
import { UserModel } from 'src/app/model/UserModel';
import { NetworkCallService } from 'src/app/networkcall.service';
import { genSaltSync,hashSync } from 'bcryptjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  userModel: UserModel = new UserModel();

  userForm!: FormGroup;
  hide = true;
  spinner:boolean=false;

  constructor(private fromBuilder: FormBuilder, private api: NetworkCallService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UserDialogComponent>) {

    this.userForm = this.fromBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", Validators.compose([Validators.required])],
      contact: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
     password :["", Validators.compose([Validators.required, Validators.minLength(8)])] 
    });

  }

  ngOnInit(): void {

  }

  addUser() {
    this.spinner = true;
    this.userForm.value.password = this.hashPassword(this.userForm.value.password);
    this.api.postUser(this.userForm.value)
      .subscribe(
        res => {
          alert("User added successfully and Activate your account through the email")
          this.userForm.reset();
          this.dialogRef.close('save');
          this.spinner = false;
        },
        error => {
          window.alert("Enter correct Details or Email ID is already Excits")
          this.spinner = false;
        }
      )
  }
  hashPassword(password: string) {
    const salt = genSaltSync();
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }
}
