import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { AuthGuard } from './core/auth.guard';

const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
// ReactiveFormsModule was selected
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
