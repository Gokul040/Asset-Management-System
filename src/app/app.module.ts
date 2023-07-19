import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, loginpage } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { ManagementRoutingModuleModule } from './management-page/management-page-module/management-routing-module.module';
import { ManagementPageModuleModule } from './management-page/management-page-module/management-page-module.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserDialogComponent } from './management-page/user-management/user-dialog/user-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NetworkCallService } from './networkcall.service';
import { UserUpdateDialogComponent } from './management-page/user-management/user-update-dialog/user-update-dialog.component';
import { httpInterceptorProviders } from './security/JwtInterceptor';
import { HasRoleGuardGuard } from './security/has-role-guard.guard';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    AppComponent, UserDialogComponent, LoginpageComponent, loginpage, UserUpdateDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ManagementPageModuleModule, ManagementRoutingModuleModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatDialogModule
    , MatDividerModule, FlexLayoutModule, FormsModule, MatInputModule, MatCardModule, MatTableModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatRadioModule, MatAutocompleteModule, ReactiveFormsModule, MatTooltipModule, HttpClientModule, MatPaginatorModule, MatDatepickerModule, MatExpansionModule
    , MatSortModule, _MatSlideToggleRequiredValidatorModule, MatSnackBarModule, MatStepperModule,MatTableExporterModule,
    NgxCaptchaModule
  ],

  providers: [NetworkCallService, HasRoleGuardGuard, httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [UserDialogComponent, UserUpdateDialogComponent],
})
export class AppModule { }
