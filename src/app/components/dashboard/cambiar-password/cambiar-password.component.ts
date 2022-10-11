import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  cambiarPassword: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) { 
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, {validator: this.checkPassword })
  }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup):any {
    const pass = group.value.nuevaPassword;
    const confirmPass = group.value.confirmPassword;
    return pass === confirmPass ? null : {notSame: true}
  }

  guardarPassword() {
    this.loading = true;

    const changePaswword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    }

    this.usuarioService.changePassword(changePaswword).subscribe({
      next: (resp) => {
        this.loading = false;
        this.cambiarPassword.reset();
        this.toastr.info(resp.message);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.cambiarPassword.reset();
        this.toastr.error(err.error.message, 'Error!');
      }
    })
  }

}
