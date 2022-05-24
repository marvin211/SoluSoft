import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit( ): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido, '+ data.nombreUsuario,
          showConfirmButton: false,
          timer: 2000
        })

        console.log(data.nombreUsuario);

        this.router.navigate(['/']);
      },

      err => {
        this.isLogged = false;

        console.log(this.isLoginFail);
        this.errMsj = "Usuario o contraseña incorrectos";

        swal.fire({
          position: 'center',
          icon: 'error',
          title: this.errMsj,
          showConfirmButton: false,
          timer: 2000
        });

      }
    );
  }

}
