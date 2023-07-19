import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetModel } from './model/AssetModel';
import { UserModel } from './model/UserModel';
import { ApiResponse } from './model/ApiResponse';
import { TokenStorageService } from './security/token-storage.service';
import { AssetLocation } from './model/AssetLocation';
import { assetDetails } from './model/AssetDetails';


@Injectable({
  providedIn: 'root'
})
export class NetworkCallService {

  private URLRegisteration = "http://localhost:8080"


  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(public httpClient: HttpClient, private inject: Injector) { }

  storage = this.inject.get(TokenStorageService)

  postLogin(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.httpClient.post(`${this.URLRegisteration}/authenticate`, data, httpOptions);
  }

// Employee
  getEmployee(): Observable<AssetModel[]> {
    return this.httpClient.get<AssetModel[]>(`${this.URLRegisteration}/employee/get-all-employee`);
  }
  getEmployeeById(data: string): Observable<AssetModel> {
    return this.httpClient.get<AssetModel>(`${this.URLRegisteration}/employee/get-one-employee/` + data);
  }
  getEmployeeDetailsByAssetLocationId(data: number): Observable<AssetModel> {
    return this.httpClient.get<AssetModel>(`${this.URLRegisteration}/employee/get-one-employee-assetLocation/` + data);
  }
  putEmployee(data: any): Observable<Object> {
    return this.httpClient.put<Object>(`${this.URLRegisteration}/employee/update-employee`, data, { responseType: 'text' as 'json' });
  }
  addEmployee(data: any): Observable<Object> {
    return this.httpClient.post<Object>(`${this.URLRegisteration}/employee/newemployee`, data, { responseType: 'text' as 'json' });
  }
  deleteEmployee(id: number): Observable<AssetModel> {
    return this.httpClient.delete<AssetModel>(`${this.URLRegisteration}/employee/delete-employee/` + id, { responseType: 'text' as 'json' });
  }

// Asset
  getAssetDetailsById(data: number): Observable<assetDetails> {
    return this.httpClient.get<assetDetails>(`${this.URLRegisteration}/asset-details/get-one-asset-details/` + data);
  }

// User
  putUserPassword(data: any, email: string): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.URLRegisteration}/update-profile/` + email, data, { responseType: 'text' as 'json' });
  }

  postPassword(data: any): Observable<any> {
    return this.httpClient.post(`${this.URLRegisteration}/register/forgotpassword`, data, { responseType: 'text' as 'json' });
  }
  confirmPassword(data: any): Observable<any> {
    return this.httpClient.put(`${this.URLRegisteration}/register/verify-account`, data, { responseType: 'text' as 'json' })
  }

  GenerateRefreshToken() {
    let input = {
      "jwtToken": this.storage.getToken(),
      "refreshToken": this.storage.getRefreshToken()
    }
    return this.httpClient.post(`${this.URLRegisteration}/authenticate/refreshtoken`, input, { responseType: 'text' as 'json' });
  }

  getProfileUser(userName: any): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.URLRegisteration}/register/get-user/` + userName);
  }
  putPasswordProfileUser(data: any): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.URLRegisteration}/register/update-profile`, data, { responseType: 'text' as 'json' });
  }

  postUser(data: UserModel): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.URLRegisteration}/register/newuser`, data, { responseType: 'text' as 'json' });
  }
  getUser() {
    return this.httpClient.get<any>(`${this.URLRegisteration}/register/get-user`);
  }

  putUser(data: any) {
    return this.httpClient.put<any>(`${this.URLRegisteration}/register/update-user`, data, { responseType: 'text' as 'json' });
  }

  deleteUser(id: number) {
    return this.httpClient.delete<any>(`${this.URLRegisteration}/register/delete-user/` + id, { responseType: 'text' as 'json' });
  }

  // asset Location
  getAssetLocation() {
    return this.httpClient.get<any>(`${this.URLRegisteration}/assetLocation/get-all-location`);
  }
  getAssetLocationById(id: number) {
    return this.httpClient.get<any>(`${this.URLRegisteration}/assetLocation/get-one-location/` + id);
  }
  putAssetLocation(data: any) {
    return this.httpClient.put<any>(`${this.URLRegisteration}/assetLocation/update-location`, data, { responseType: 'text' as 'json' });
  }

  deleteAssetLocation(id: number) {
    return this.httpClient.delete<any>(`${this.URLRegisteration}/assetLocation/delete-location/` + id, { responseType: 'text' as 'json' });
  }

  postAssetLocation(data: any): Observable<AssetLocation> {
    return this.httpClient.post<AssetLocation>(`${this.URLRegisteration}/assetLocation/newLocation`, data, { responseType: 'text' as 'json' });
  }
}
