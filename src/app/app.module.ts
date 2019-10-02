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
import {LoginComponent} from './components/login/login.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {NewGoalComponent} from './components/new-goal/new-goal.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProgressComponent} from './components/progress/progress.component';
import {SignupComponent} from './components/signup/signup.component';
import {AngularFireGoalManagementService} from './services/af-goal-management.service';
import {AngularFireUserAccountService} from './services/af-user-account.service';
import {GoalManagementService} from './services/goal-management.service';
import {UserAccountService} from './services/user-account.service';


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

  ],
  imports: [
    BrowserModule,
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
    AngularFireUserAccountService,
    AngularFireGoalManagementService,
    {provide: UserAccountService, useClass: AngularFireUserAccountService},
    {
      provide: GoalManagementService,
      useClass: AngularFireGoalManagementService
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
