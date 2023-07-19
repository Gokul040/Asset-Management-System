import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { assetDetails } from 'src/app/model/AssetDetails';
import { AssetLocation } from 'src/app/model/AssetLocation';
import { AssetModel } from 'src/app/model/AssetModel';

import { NetworkCallService } from 'src/app/networkcall.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  dashBoardData: any;
  dashBoardUserData: any;
  total: any;
  activeEmployees?: number;
  nonActiveEmployees?: number;
  assetData: any;
  assetDetailss: any = assetDetails;
  asset_Location: any = AssetLocation;
  employeeDetails: any = AssetModel;

  constructor(private api: NetworkCallService) { }
  ngOnInit(): void {
    this.getAllAsset();
    this.getAllProduct();
    this.getAllUser();
  }

  getAllAsset(): void {
    this.api.getEmployee()
      .subscribe((res: Data[]) => {
        this.assetData = res;
        this.activeEmployees = res.filter(asset => asset['status'] === true).length;
        this.nonActiveEmployees = res.filter(asset => asset['status'] === false).length;
        this.total = res.length
      })
  }

  getAllProduct() {
    this.api.getEmployee()
      .subscribe((res: Data[]) => {

        this.dashBoardData = res.sort((a, b) =>
          new Date(b['updatedDate']).getTime() - new Date(a['updatedDate']).getTime()
        ).slice(0, 5)
      });
  }

  getAllUser() {
    this.api.getUser()
      .subscribe((res: Data[]) => {
        this.dashBoardUserData = res.length
      })
  }

  showAssetDetailsInModel(datas: any) {
    this.employeeDetails = datas;
    this.api.getAssetDetailsById(datas.id)
      .subscribe({
        next: (res) => {
          this.assetDetailss = res;
        },
        error: () => {
          
        }
      }),
      this.api.getAssetLocationById(datas.id).subscribe({
        next: (res) => {

          this.asset_Location = res;
        }
      })
  }
}
