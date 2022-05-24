import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';
import swal from "sweetalert2";

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cuenta Creada',
          showConfirmButton: false,
          timer: 2000
        })

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        swal.fire({
          position: 'center',
          icon: 'error',
          title: this.errMsj,
          showConfirmButton: false,
          timer: 2000
        })
      }
    );
  }

}
