import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule, MatNativeDateModule, MatTabsModule} from '@angular/material/';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarHeatmap} from 'angular2-calendar-heatmap';
import {NgxLiquidGaugeModule} from 'ngx-liquid-gauge';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarchartComponent} from './components/barchart/barchart.component';
import {CalendarViewComponent} from './components/calendar-view/calendar-view.component';
import {GoalManagementComponent} from './components/goal-management/goal-management.component';
import {GroupsComponent} from './components/groups/groups.component';
import {HomeComponent} from './components/home/home.component';
import {ImageCropperComponent} from './components/image-cropper/image-cropper.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {LoginComponent} from './components/login/login.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {NewGoalComponent} from './components/new-goal/new-goal.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProgressComponent} from './components/progress/progress.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserHomeComponent} from './components/user-home/user-home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {GoalService} from './services/goal.service';
import {ImageService} from './services/image.service';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    MainpageComponent,
    NewGoalComponent,
    ProgressComponent,
    GroupsComponent,
    ProfileComponent,
    GoalManagementComponent,
    CalendarViewComponent,
    BarchartComponent,
    CalendarHeatmap,
    ImageCropperComponent,
    UserHomeComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    NgxLiquidGaugeModule,

  ],
  providers: [
    UserService, GoalService,
    // AngularFireGoalManagementService, {
    //   provide: GoalManagementService,
    //   useClass: AngularFireGoalManagementService
    // },
    AuthGuardService, ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
