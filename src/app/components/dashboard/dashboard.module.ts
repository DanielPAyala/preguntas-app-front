import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';

// Components
import { DashboardComponent } from './dashboard.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CambiarPasswordComponent,
    CuestionariosComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class DashboardModule { }
