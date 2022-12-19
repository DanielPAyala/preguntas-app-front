import { Component, OnInit } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../../services/respuesta-cuestionario.service';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from '../../../../../models/cuestionario';
import { RespuestaCuestionarioDetalle } from '../../../../../models/respuestaCuestionarioDetalle';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {

  idRespuesta: number;
  loading: boolean = false;
  cuestionario?: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = [];

  constructor(
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private aRoute: ActivatedRoute
  ) { 
    this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getListRespuetasYCuestionario();
  }

  getListRespuetasYCuestionario(): void {
    this.loading = true;
    this.respuestaCuestionarioService.getCuestionarioByIdRtaRespuesta(this.idRespuesta).subscribe({
      next: (resp) => {
        this.cuestionario = resp.cuestionario;
        // console.log(this.cuestionario);
        this.respuestas = resp.respuestas;
        // console.log(this.respuestas);
        this.loading = false;
      }
    });
  }

}
