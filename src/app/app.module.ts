import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RolesComponent } from './roles/roles.component';
import { SpectaclesComponent } from './spectacles/spectacles.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersComponent } from './users/users.component';
// Services
import { UsersService } from "./services/users.service";
import { RolesService } from "./services/roles.service";
import { SharingService } from "./services/sharing.service";
import { PagerService } from "./services/pager.service";
import { ModalComponent } from './modal/modal.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'spectacles', component: SpectaclesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // {
  //   path: 'user', children: [
  //     {
  //       path: 'list', component: UserListComponent, children: [
  //         { path: 'detail/:name', component: UserComponent }
  //       ]
  //     }
  //   ]
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    SpectaclesComponent,
    RolesComponent,
    UsersComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    CookieService,
    UsersService,
    RolesService,
    SharingService,
    PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
