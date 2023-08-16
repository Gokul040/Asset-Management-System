import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NetworkCallService } from 'src/app/networkcall.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { error } from 'jquery';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  public status:string = "";


  displayedColumns: string[] = ['S.No','firstname','lastname', 'contactno', 'emailid', 'role','status', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private matDialog: MatDialog, private dialog: MatDialog, private api: NetworkCallService) {}

  ngOnInit(): void {
    this.getAllUser()
  }

  userDialog() {
    this.dialog.open(UserDialogComponent, {
    }).afterClosed().subscribe(val => {
      if (val == "save") {
        this.getAllUser();
      }
    })
  }

 

  getAllUser() {
    this.api.getUser()
      .subscribe( res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    )
  }

  editUser(row: any) {
    this.dialog.open(UserUpdateDialogComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === "update") {
        this.getAllUser();
      }
    })
  }


  deleteUser(id: number) {
    this.api.deleteUser(id)
      .subscribe(res => {
        console.log(res);
          alert("User Deleted Successfully" )
          this.getAllUser();
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
