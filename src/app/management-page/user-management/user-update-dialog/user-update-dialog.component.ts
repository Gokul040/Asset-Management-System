import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NetworkCallService } from 'src/app/networkcall.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.css']
})
export class UserUpdateDialogComponent implements OnInit {

  updateForm!: FormGroup;
  hide = true;


  public editDatas = {
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    role: '',
    enabled: ''
  }
  constructor(private fromBuilder: FormBuilder, private api: NetworkCallService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<UserDialogComponent>) {

    this.updateForm = this.fromBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", Validators.compose([Validators.required])],
      contact: ["", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      enabled: ["", Validators.required],
      role: ["", Validators.required]
    });


  }

  ngOnInit(): void {
    this.updateForm.controls['email'].setValue(this.editData.email);
    this.updateForm.controls['firstName'].setValue(this.editData.firstName);
    this.updateForm.controls['lastName'].setValue(this.editData.lastName);
    this.updateForm.controls['contact'].setValue(this.editData.contact);
    this.updateForm.controls['enabled'].setValue(this.editData.enabled);
    this.updateForm.controls['role'].setValue(this.editData.role);
    this.editDatas = this.updateForm.value;
  }


  updateUser() {
    this.api.putUser(this.updateForm.value)
      .subscribe(res => {
        alert("Updated Successfully");
        this.updateForm.reset();
        this.dialogRef.close('update');
      });
  }
}
