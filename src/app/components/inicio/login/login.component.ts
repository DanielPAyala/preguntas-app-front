import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService) { 
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  log(): void {
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    };

    this.loading = true;

    this.loginService.login(usuario).subscribe({
      next: (resp) => {
        this.loading = false;
        this.login.reset();
        this.loginService.setNombreUsuario(resp.usuario);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error.message, 'Error');
        this.login.reset();
      }
    })
    // setTimeout(() => {
    //   if (usuario.nombreUsuario === '1234' && usuario.password == '1234') {
    //     this.login.reset();
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     this.toastr.error('User or password failed', 'Error');
    //     this.login.reset();
    //     this.loading = false;
    //   }
    // }, 2500);
  }

}
