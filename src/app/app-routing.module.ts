import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "resetpassword/:token", component: ResetpasswordComponent },
  { path: "dashboard", component: DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
