import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { ManagementPageComponent } from '../management-page.component';
import { HelpComponent } from '../help/help.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { authGuard } from 'src/app/security/auth.guard';
import { HasRoleGuardGuard } from 'src/app/security/has-role-guard.guard';
import { AMEditPageComponent } from '../asset-management/amedit-page/amedit-page.component';



const appRoutes: Routes = [
  {
    path: 'adminManagement', component: ManagementPageComponent,
    children:
      [{
        path: 'adminDashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard]
      },
      {
        path: 'assetManagement',
        component: AssetManagementComponent,
        canActivate: [authGuard]
      },
      {
        path: 'userManagement',
        component: UserManagementComponent,
        canActivate: [authGuard, HasRoleGuardGuard],
        data: { role: ['ADMIN'] }
      },
      {
        path: 'help',
        component: HelpComponent,
        canActivate: [authGuard],
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [authGuard]
      },
      {
        path: 'AMEditpage',
        component: AMEditPageComponent,
        canActivate: [authGuard,HasRoleGuardGuard],
        data: { role: ['ADMIN'] }
      }
      ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes)],
  exports: [RouterModule]
})
export class ManagementRoutingModuleModule { }
export const managementpages = [AdminDashboardComponent, AssetManagementComponent, UserManagementComponent, HelpComponent, ChangePasswordComponent, AMEditPageComponent]

