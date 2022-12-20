import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Login';
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }

  setNombreUsuario(data: string) {
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token')!);
    return decodedToken;
  }

  getNombreUsuario(): string {
    // return localStorage.getItem('nombreUsuario') || "";
    return this.getTokenDecoded().sub;
  }

  removeLocalStorage(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
