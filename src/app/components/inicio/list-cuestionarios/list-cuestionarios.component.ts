import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Cuestionario } from '../../../models/cuestionario';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css'],
})
export class ListCuestionariosComponent implements OnInit {
  loading: boolean = false;
  listCuestionarios: Cuestionario[] = [];

  constructor(
    private cuestionarioService: CuestionarioService,
    private router: Router,
    private respuestaCuestionarioService: RespuestaCuestionarioService
  ) {}

  ngOnInit(): void {
    this.getListCuestionarios();
  }

  getListCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarios().subscribe({
      next: (resp) => {
        this.listCuestionarios = resp;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  ingresarNombre(idCuestionario: number) {
    this.respuestaCuestionarioService.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/ingresarNombre']);
  }
}
