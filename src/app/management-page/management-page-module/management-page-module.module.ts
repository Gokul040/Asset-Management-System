import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPageComponent } from '../management-page.component';
import { ManagementRoutingModuleModule, managementpages } from './management-routing-module.module';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HelpComponent } from '../help/help.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NetworkCallService } from 'src/app/networkcall.service';
import { HasRoleGuardGuard } from 'src/app/security/has-role-guard.guard';
import { JwtInterceptor } from 'src/app/security/JwtInterceptor';
import { AMEditPageComponent } from '../asset-management/amedit-page/amedit-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    ManagementPageComponent,
    AdminDashboardComponent,
    AssetManagementComponent,
    UserManagementComponent
    , managementpages, HelpComponent, ChangePasswordComponent, AMEditPageComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModuleModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatSlideToggleModule
    , MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule, MatButtonModule, MatMenuModule, MatDialogModule, MatDividerModule, BrowserModule, FormsModule
    , MatFormFieldModule, MatSelectModule,
    MatRadioModule, MatAutocompleteModule, MatTooltipModule, HttpClientModule, MatPaginatorModule, MatDatepickerModule,
    MatExpansionModule, MatCardModule, FlexLayoutModule, MatTableModule, MatSortModule,MatTableExporterModule,NgxCaptchaModule
    , _MatSlideToggleRequiredValidatorModule, MatStepperModule, MatInputModule],
  exports:
    [
    ],
  providers: [NetworkCallService,HasRoleGuardGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
})
export class ManagementPageModuleModule {

}
