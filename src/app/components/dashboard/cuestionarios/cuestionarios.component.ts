import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from '../../../models/cuestionario';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css'],
})
export class CuestionariosComponent implements OnInit {
  listCuestionarios: Cuestionario[] = [];
  loading: boolean = false;

  get nombreUsuario() {
    return this.loginService.getNombreUsuario();
  }

  constructor(
    private loginService: LoginService,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCuestionarios();
  }

  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarios().subscribe({
      next: (resp) => {
        this.listCuestionarios = resp;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  eliminarCuestionario(idCuestionario: number): void {
    if (confirm('Esta seguro?')) {
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe({
        next: (resp) => {
          this.toastr.success('El cuestionario fue eliminado con exito', 'Registro eliminado');
          this.getCuestionarios();
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error('Ops, ocurrio un error');
        }
      })
    }
  }
}
