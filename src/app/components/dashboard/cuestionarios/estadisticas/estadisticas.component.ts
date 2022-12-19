import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { RespuestaCuestionario } from '../../../../models/respuestaCuestionario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  idCuestionario: number;
  loading: boolean = false;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];

  constructor(
    private aRoute: ActivatedRoute,
    private respuestaCuestionarioService: RespuestaCuestionarioService,
    private toastr: ToastrService
  ) { 
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }

  getListCuestionarioService() : void {
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe({
      next: (resp) => {
        this.loading = false;
        this.listRespuestaCuestionario = resp;
        console.log(this.listRespuestaCuestionario);
      }
    });
  }

  eliminarRtaCuestionario(idRtaCuestionario: number): void {
    this.loading = true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe({
      next: (resp) => {
        this.loading = false;
        this.toastr.success('La respuesta al cuestionario fue eliminada con exito', 'Registro eliminado');
        this.getListCuestionarioService();
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

}
