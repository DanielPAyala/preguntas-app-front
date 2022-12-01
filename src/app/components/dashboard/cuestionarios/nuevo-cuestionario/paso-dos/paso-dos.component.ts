import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Pregunta } from '../../../../../models/pregunta';
import { Cuestionario } from '../../../../../models/cuestionario';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {

  listPreguntas: Pregunta[]= [];
  tituloCuestionario: string;
  descripcionCuestionario: string;
  loading: boolean = false;

  constructor(
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.tituloCuestionario = cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = cuestionarioService.descripcionCuestionario;
  }

  ngOnInit(): void {
  }

  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
  }

  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);
  }

  guardarCuestionario(): void {
    this.loading = true;

    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    }

    // Enviamos cuestionario al back
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe({
      next: (resp) => {
        this.toastr.success('El cuestionario fuer registrado con éxito', 'Cuestionario Registrado')
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: error => {
        this.toastr.error('Opps... ocurrió un error!', 'Error');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      }
    })
  }

}
