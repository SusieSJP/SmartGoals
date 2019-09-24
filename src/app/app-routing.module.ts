import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GoalManagementComponent} from './components/goal-management/goal-management.component';
import {GroupsComponent} from './components/groups/groups.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {NewGoalComponent} from './components/new-goal/new-goal.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProgressComponent} from './components/progress/progress.component';
import {SignupComponent} from './components/signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}, {
    path: 'mainpage/:id',
    component: MainpageComponent,
    children: [
      {path: 'new-goal', component: NewGoalComponent},
      {path: 'personal-progress', component: ProgressComponent},
      {path: 'groups', component: GroupsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'goal-management', component: GoalManagementComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
