import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from '../../app-routing.module';

// Components
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio.component';
import { SharedModule } from '../../shared/shared.module';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { IngresarNombreComponent } from './list-cuestionarios/ingresar-nombre/ingresar-nombre.component';
import { PreguntaComponent } from './list-cuestionarios/pregunta/pregunta.component';
import { RespuestaCuestionarioComponent } from './list-cuestionarios/respuesta-cuestionario/respuesta-cuestionario.component';

@NgModule({
  declarations: [
    InicioComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ListCuestionariosComponent,
    IngresarNombreComponent,
    PreguntaComponent,
    RespuestaCuestionarioComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    InicioComponent
  ]
})
export class InicioModule { }
