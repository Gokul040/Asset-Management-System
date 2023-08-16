import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NetworkCallService } from 'src/app/networkcall.service';
import { data, error } from 'jquery';

@Component({
  selector: 'app-amedit-page',
  templateUrl: './amedit-page.component.html',
  styleUrls: ['./amedit-page.component.css']
})
export class AMEditPageComponent implements OnInit {
  public status: string = "";
  private employeeDetails: any;

  displayedColumns: string[] = ['S.No', 'id', 'placeId', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  locationForm!: FormGroup;
  placeIdEdit: boolean = false;
  masterHome: boolean = true;


  public editDatas = {
    id: '',
    placeId: '',
  }

  constructor(private matDialog: MatDialog, private dialog: MatDialog, private api: NetworkCallService, private formBuiler: FormBuilder) {
    this.locationForm = this.formBuiler.group({
      id: ["", Validators.required],
      placeId: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllLocation();



  }

  getAllLocation() {
    this.api.getAssetLocation()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      )
  }

  postLocation() {
    const data = this.locationForm
    this.api.postAssetLocation(data.value).subscribe(
      {
        next: (res) => {
          alert("Location added successfully");
          this.getAllLocation();
        },
        error: () => {

          alert("Error while adding the Location");
          this.getAllLocation();
        }
      }
    )
  }

  edit(data: any) {
    this.editDatas = data;
  }

  editLocation() {

    this.api.putAssetLocation(this.editDatas).subscribe(
      {
        next: (res) => {
          alert("Location updated successfully");
          this.locationForm.reset();
          this.getAllLocation();
        },
        error: () => {

          alert("Place ID already exist")
          this.getAllLocation();
        }
      })
  }

  deleteLocation(id: number) {
    this.api.deleteAssetLocation(id)
      .subscribe(
        {
          next: (res) => {
            alert("Location Deleted successfully");
            this.getAllLocation();
          },
          error: () => {
            this.api.getEmployeeDetailsByAssetLocationId(id).subscribe({
              next: (res) => {
                this.employeeDetails = res.employeeRollNumber;
                alert("The Location Assigned to " + this.employeeDetails + "  Remove Employee Details after try");
              }
            })
            this.getAllLocation();
          }

        }
      )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  placeIdEditEnable() {
    this.placeIdEdit = true;
    this.masterHome = false;
    this.getAllLocation();
  }
  placeIdEditDisable() {
    this.placeIdEdit = false;
    this.masterHome = true;
  }


}

