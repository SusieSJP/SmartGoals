import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SigninComponent} from './components/signin/signin.component';

const appRoutes: Routes =
    [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signin', component: SigninComponent}
    ]

    @NgModule({
      declarations:
          [AppComponent, SigninComponent, HomeComponent, LoginComponent],
      imports: [
        BrowserModule, AppRoutingModule, BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule, MatToolbarModule,
        RouterModule.forRoot(appRoutes), MatInputModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    }) export class AppModule {}

export class PizzaPartyAppModule {}
