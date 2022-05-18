import { Injectable } from '@angular/core';
// import { formatDate, DatePipe } from '@angular/common';
import { Cliente } from './cliente';
import { Region } from './region';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from "sweetalert2";
// import { of, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpoint:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndpoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(

      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),

      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('es-GT');
          // cliente.createAt = formatDate(cliente.createAt,'dd-mm-yyyy','es-GT');
          // cliente.createAt = datePipe.transform(cliente.createAt,'EEE dd MMM yyyy');
          return cliente;
        });
        return response;
      }),

      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      })

    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  /* PRIMER METODO
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }  PRIMER METODO */

  // SEGUNDO METODO
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  // subirFoto(archivo: File, id): Observable<Cliente>{
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
    // .pipe(
    //   map( (response: any) => response.cliente as Cliente),
    //   catchError(e => {
    //     console.error(e.error.mensaje);
    //     swal.fire(e.error.mensaje, e.error.error, 'error');
    //     return throwError(e);
    //   })
    // );
  }

}
