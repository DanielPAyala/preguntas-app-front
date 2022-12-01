import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuestionarioService } from '../../../../../services/cuestionario.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent implements OnInit {

  datosCuestionario: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cuestionarioService: CuestionarioService
  ) { 
    this.datosCuestionario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  pasoUno(): void {
    this.cuestionarioService.tituloCuestionario = this.datosCuestionario.value.titulo;
    this.cuestionarioService.descripcionCuestionario = this.datosCuestionario.value.descripcion;
    this.router.navigate(['/dashboard/nuevoCuestionario/pasoDos']);
  }

}
