import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { TokenStorageService } from '../security/token-storage.service';
import { NetworkCallService } from '../networkcall.service';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.css']
})
export class ManagementPageComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isShowNavigate: boolean = true;
  isLoggedIn = false;
  dataName: any;
  userName?: String;
  lastUserName?: String;


  constructor(private observer: BreakpointObserver, private router: Router, private tokenStorage: TokenStorageService, private api: NetworkCallService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!window.sessionStorage.getItem('userRole');
    if (this.isLoggedIn) {
      const userRole = window.sessionStorage.getItem('userRole')
      //        this.isShowNavigate = true;
      //    }else if(userRole){
      //        this.isShowNavigate = false;
      //    }
      if (userRole?.includes('ADMIN')) {
        this.isShowNavigate = true;
      } else if (userRole?.includes('USER'))
        this.isShowNavigate = false;

    }
    this.getProfile();
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logout() {
    this.tokenStorage.logOut();
  this.router.navigate(['/login'])
  }

  getProfile() {

    const userEmail = window.sessionStorage.getItem('email');
    this.api.getProfileUser(userEmail)
      .subscribe({
        next: (res) => {


          this.userName = res.firstName;
          this.lastUserName = res.lastName;
        }
      })
  }
}



