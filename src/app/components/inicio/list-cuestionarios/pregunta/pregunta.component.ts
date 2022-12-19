import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { Router } from '@angular/router';
import { Pregunta } from '../../../../models/pregunta';
import { RespuestaCuestionarioDetalle } from '../../../../models/respuestaCuestionarioDetalle';
import { RespuestaCuestionario } from '../../../../models/respuestaCuestionario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent implements OnInit {
  idCuestionario: number;
  listPreguntas: Pregunta[] = [];
  loading:boolean =  false;
  rtaConfirmada: boolean = false;
  opcionSeleccionada: any;
  index: number = 0;
  idRespuestaSeleccionada: number = 0;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private cuestionarioService: CuestionarioService,
    private router: Router
  ) {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
  }

  ngOnInit(): void {
    if (this.idCuestionario == 0) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.respuestaCuestionarioService.respuestas = [];
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe({
      next: (resp) => {
        console.log(resp);
        this.listPreguntas = resp.listPreguntas;
        this.loading = false;
        this.respuestaCuestionarioService.cuestionario = resp;
      }
    })
  }

  getPregunta(): string {
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada(respuesta: any): void {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = respuesta.id;
  }

  addClassOption(respuesta: any): string {
    if (respuesta == this.opcionSeleccionada) {
      return 'active';
    }
    return '';
  }

  siguiente(): void {
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

    this.listRespuestaDetalle.push({respuestaId: this.idRespuestaSeleccionada});

    this.rtaConfirmada = false;
    this.index++;
    console.log(this.respuestaCuestionarioService.respuestas);
    this.idRespuestaSeleccionada = 0;
    if (this.index === this.listPreguntas.length) {
      // this.router.navigate(['/inicio/respuestaCuestionario'])
      this.guardarRespuestaCuestionario();
    }
  }

  guardarRespuestaCuestionario(): void {
    const rtaCuestionario:RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      ListRtaCuestionarioDetalle: this.listRespuestaDetalle
    }

    this.loading = true;

    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe({
      next: (resp) => {
        this.router.navigate(['/inicio/respuestaCuestionario']);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      }
    })
  }
}
