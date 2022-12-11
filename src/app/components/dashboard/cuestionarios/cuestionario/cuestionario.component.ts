import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from '../../../../services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css'],
})
export class CuestionarioComponent implements OnInit {
  idCuestionario: number;
  loading: boolean = false;
  cuestionario: any = {};

  constructor(
    private cuestionarioService: CuestionarioService,
    private aRouter: ActivatedRoute
  ) {
    this.idCuestionario = +this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe({
      next: (resp) => {
        this.loading = false;
        this.cuestionario = resp;
        console.log(resp)
      }
    })
  }
}
