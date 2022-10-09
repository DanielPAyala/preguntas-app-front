import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService) { 
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPass: ['']
    }, {validator: this.checkPassword});
  }

  ngOnInit(): void {
  }

  registrarUsuario(): void {
    console.log(this.register);
    this.loading = true;
    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }

    this.usuarioService.saveUser(usuario).subscribe({
      next: (resp) => {
        console.log(resp)
        this.toastr.success(`El usuario ${usuario.nombreUsuario} fue registrado con éxito!`, 'Usuario registrado');
        this.router.navigate(['/inicio/login']);
        this.loading =  false;
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error.message, "Error");
        this.register.reset();
      }
    });
  }

  checkPassword(group: FormGroup):any {
    const pass = group.value.password;
    const confirmPass = group.value.confirmPass;
    return pass === confirmPass ? null : {notSame: true}
  }

}
