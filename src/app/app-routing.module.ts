import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { WelcomeComponent } from './components/inicio/welcome/welcome.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuestionariosComponent } from './components/dashboard/cuestionarios/cuestionarios.component';
import { CambiarPasswordComponent } from './components/dashboard/cambiar-password/cambiar-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent, children: [
    {path: '', component: WelcomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: '', component: CuestionariosComponent},
    {path: 'cambiarPassword', component: CambiarPasswordComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]},
  {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
