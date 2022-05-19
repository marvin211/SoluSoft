import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private urlEndpoint:string = 'http://localhost:8080/api/productos';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(

      tap((response: any) => {
        console.log('ProductoService: tap 1');
        (response.content as Producto[]).forEach( producto => {
          console.log(producto.nombre);
        });
      }),

      tap(response => {
        console.log('ProductoService: tap 2');
        (response.content as Producto[]).forEach( producto => {
          console.log(producto.nombre);
        });
      })

    );
  }

  create(producto: Producto) : Observable<Producto> {
    return this.http.post(this.urlEndpoint, producto, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.producto as Producto),
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

  getProducto(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/productos'])
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(producto: Producto): Observable<Producto>{
    return this.http.put(`${this.urlEndpoint}/${producto.id}`, producto, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.producto as Producto),
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

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

}
