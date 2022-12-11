import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Pregunta } from '../../../../../../models/pregunta';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../../../../../../models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: FormGroup;
  pregunta?: Pregunta;
  rtaCorrecta = 0;

  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([
        // this.fb.control()
      ])
    })
  }

  ngOnInit(): void {
    this.agregarRepuestasPorDefecto();
  }

  // Deveuelve FormArray de respuestas
  get respuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  // Agregar respuestas al array
  agregarRespuesta(): void {
    this.respuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }))
  }

  agregarRepuestasPorDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void {
    if (this.respuestas.length === 2) {
      this.toastr.error('Como mínimo la pregunta debe contener 2 respuestas', 'Error!');
    } else {
      this.respuestas.removeAt(index);
    }
  }

  setRepuestaValida(index: number): void {
    this.rtaCorrecta = index;
    console.log(this.rtaCorrecta);
  }

  agregarPregunta(): void {
    // Obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo')?.value;

    // Obtenenmos el array de repuestas
    const arrayRepuestas = this.nuevaPregunta.get('respuestas')?.value;

    // Creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRepuestas.forEach((element: any, index: number) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if(index === this.rtaCorrecta) {
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);
    this.enviarPregunta.emit(pregunta);
    this.reset();
  }

  reset(): void {
    this.rtaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.respuestas.clear();
    this.agregarRepuestasPorDefecto();
  }

}
