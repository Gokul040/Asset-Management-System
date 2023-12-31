import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NetworkCallService } from 'src/app/networkcall.service';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { assetDetails } from 'src/app/model/AssetDetails';
import { AssetModel } from 'src/app/model/AssetModel';
import { AssetLocation } from 'src/app/model/AssetLocation';
import { ngxCsv } from 'ngx-csv';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent implements OnInit {
  displayedColumns: string[] = ['employeeRollNumber', 'employeeName', 'employeeContact', 'employeeEmail', 'status', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnFilter: any;
  columValue1: any;
  columValue2: any;
  employeeForm!: FormGroup;
  assetDetailsForm: FormGroup;
  assetLocationForm: FormGroup;
  animation: boolean = false;
  edit: boolean = false;
  add: boolean = false;
  assetTable: boolean = true;
  addEmployee: boolean = true;
  addAssets: boolean = false;
  addLocation: boolean = false;
  assetDetailss: any = assetDetails;
  assetAllDetails: any;
  asset_Location: any = AssetLocation;
  value: boolean = false;
  editEmployeeDetail: any;
  modalData: any = AssetModel;
  data1?: any = [];
  data2: AssetModel[] = [];


  employeeDetails = {
    id: '',
    employeeRollNumber: '',
    employeeName: '',
    employeeEmail: '',
    employeeContact: '',
    assetDetails: {
      laptop_name: '',
      monitorNumber: '',
      lanIdNumber: '',
      laptopChargerNumber: '',
      mouseStatus: '',
      earPhoneStatus: '',
      laptopBag: '',
      lockerCode: '',
      keyboardNumber: '',
    },
    assetLocation: {
      placeId: ''
    },
    status: ''
  }


  constructor(private matDialog: MatDialog, private api: NetworkCallService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.employeeForm = this.formBuilder.group({
      employeeRollNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
      employeeName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      employeeContact: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      employeeEmail: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('', [Validators.required]),
    });

    this.assetDetailsForm = this.formBuilder.group({
      laptop_name: new FormControl('', [Validators.required]),
      monitorNumber: new FormControl('', [Validators.required]),
      lanIdNumber: new FormControl('', [Validators.required]),
      laptopChargerNumber: new FormControl('', [Validators.required]),
      mouseStatus: new FormControl('', [Validators.required]),
      earPhoneStatus: new FormControl('', [Validators.required]),
      laptopBag: new FormControl('', [Validators.required]),
      keyboardNumber: new FormControl('', [Validators.required]),
      lockerCode: new FormControl('', [Validators.required]),
    });
    this.assetLocationForm = this.formBuilder.group({
      placeId: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  addEmployeeDetails(data: any) {
    this.api.addEmployee(data)
      .subscribe({
        next: (res) => {
          alert("Employee Details Added Successfully!!")
          this.getAllProduct();
          this.assetTables();
        },
        error: () => {
          alert("Error while adding")
        }
      })
  }


  editEmployeeDetails(data: any) {
    this.api.putEmployee(data)
      .subscribe({
        next: (res) => {
          alert("Employee Details Modified Successfully!!")
          this.getAllProduct();
          this.assetTables();
        },
        error: () => {
          alert("Error while adding")
        }
      })
  }

  editAsset(data: any) {
    this.api.getEmployeeById(data).subscribe(
      {
        next: (res) => {
          this.editEmployeeDetail = res;

        }
      }
    )
    this.edit = true;
    this.add = false;
    this.assetTable = false;
  }


  ngOnInit(): void {
    this.getAllProduct();
    this.getAssetDetails();
    this.getAllProductExport();
    this.dataSource = new MatTableDataSource<any>(this.displayedColumns)
  }

  getAllProduct() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.data2 = res;
        },
        error: (err) => {
          alert("Error while fetching the Records");
        }
      })
  }

  getAllProductExport() {
    this.api.getEmployeeExport()
      .subscribe(
        {
          next: (res) => {
            this.data1 = res;
            // this.data2 = res;

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          },
          error: (err) => {
            alert("Error while fetching the Records");
          }
        })
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id)
      .subscribe({
        next: (res) => {
          alert("Asset Deleted Successfully")
          this.getAllProduct();
        },
        error: () => {
          alert("Error while Deleting the Asset");
          this.getAllProduct();
        }
      })
  }

  showAssetDetailsInModel(datas: any) {
    this.modalData = datas;
    this.api.getAssetDetailsById(datas.id)
      .subscribe({
        next: (res) => {
          this.assetDetailss = res;

        },
        error: () => {
          // alert("Error while FETCHING the Data");
        }
      }),
      this.api.getAssetLocationById(datas.id).subscribe({
        next: (res) => {

          this.asset_Location = res;
        }
      })
  }
  getAssetDetails() {
    this.api.getAssetDetails().subscribe({
      next: (res) => {
        // this.data2 = res;
      },
      error: () => {
        // alert("Error while FETCHING the Data");
      }
    })
  }

  addAsset() {
    this.add = true;
    this.edit = false;
    this.assetTable = false;
  }
  assetTables() {
    this.edit = false;
    this.add = false;
    this.assetTable = true;
  }
  add_Employee() {
    this.addEmployee = true;
    this.addAssets = false;
    this.addLocation = false;
  }
  add_Asset() {
    this.addEmployee = false;
    this.addAssets = true;
    this.addLocation = false;
  }
  add_Location() {
    this.addEmployee = false;
    this.addAssets = false;
    this.addLocation = true;
  }


  // // Filter methods---------------------------------------------------------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // // CSV Export ---------------------------------------------------------------------------------
  exportData() {
    debugger
    this.getAllProductExport();
    const csvData = this.data2.map((asset) => {
      const assetDetailsString = JSON.stringify(asset.assetDetails);
      const assetLocationString = JSON.stringify(asset.assetLocation);
      const assetDetails = JSON.parse(assetDetailsString);
      const assetLocation = JSON.parse(assetLocationString);
      const csvDataArray = [
        asset.id,
        asset.employeeRollNumber,
        asset.employeeName,
        asset.employeeEmail,
        asset.employeeContact,
      ];
      for (const [key, value] of Object.entries(assetDetails)) {
        csvDataArray.push(`${value}`);
      }
      for (const [key, value] of Object.entries(assetLocation)) {
        csvDataArray.push(`${value}`);
      }
      csvDataArray.push(asset.status);
      csvDataArray.push(asset.updatedDate?.toString())
      csvDataArray.push(asset.createdDate?.toString())
      return csvDataArray;
    });
    const csvHeaders = Object.keys(csvData)

    var options = {
      title: "Employee Details",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLables: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers:
        ['assetId', 'EmployeeRollNumber', 'EmployeeName', 'EmployeeEmail', 'EmployeeContact',
          'Asset Id', 'Laptop Name', 'Monitor Number', 'Lan Id Number', 'Keyboard Serial Number', 'Charger Serial Number', 'Mouse Status', 'EarPhone Status', 'LaptopBag', 'Locker Code',
          'AssetLocation Id', 'Place Id', 'status', 'updatedDate', 'createdDate']
    };
    new ngxCsv(csvData, 'report', options);
  }

  //     applyColumnFilter(filterValue:string, column:string){
  //       filterValue = filterValue.trim().toLowerCase();
  //       this.dataSource.filterPredicate = (data:any,filter:string)=>{
  //         const column1Value = data['branchId'].toString().toLowerCase();
  //         const column2Value = data['status'].toString().toLowerCase();
  //         return column1Value.includes(this.columValue1) && column2Value.includes(this.columValue2);
  //       };
  //       if(column === 'branchId' ){
  //         this.columValue1 = filterValue;
  //       } 
  //       if ( column === 'status'){
  //         this.columValue2 = filterValue;
  //       }
  //       this.dataSource.filter = filterValue;
  //     }

  //     getdisplayedColumnValuesBranch(column:string): string[]{
  //         return Array.from(new Set (this.dataSource.data.map((data:any)=> data['branchId'])));
  //     }

  //     getdisplayedColumnValuesStatus(column:string): string[]{
  //       return Array.from(new Set (this.dataSource.data.map((data:any)=> data['status'])));
  //   }


  //     applyColumnFilterStatus(filterValue:string, column:string){
  //     filterValue = filterValue.trim().toLowerCase();
  //     this.dataSource.filterPredicate = (data:any,filter:string)=>{
  //       const columnValue = data['status'].toString().toLowerCase();
  //       return columnValue.includes(filter);
  //     };
  //     this.dataSource.filter = filterValue;
  //   }

  //   applyColumnFilterID(filterValue:string, column:string){
  //     filterValue = filterValue.trim().toLowerCase();
  //     this.dataSource.filterPredicate = (data:any,filter:string)=>{
  //       const columnValue = data['branchId'].toString().toLowerCase();
  //       return columnValue.includes(filter);
  //     };
  //     this.dataSource.filter = filterValue;
  //   }
}

