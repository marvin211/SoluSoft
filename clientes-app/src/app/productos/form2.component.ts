import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  public producto: Producto = new Producto();
  public titulo: string = "Registrar Producto"

  public errores: string[];

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe( (producto) => this.producto = producto)
      }
    })
  }

  create(): void{
    console.log(this.producto);
    this.productoService.create(this.producto)
    .subscribe(producto => {
      this.router.navigate(['/productos'])
      swal.fire('Nuevo Producto',  `Producto ${producto.nombre} creado con éxito!`,  'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

  update():void{
    console.log(this.producto);
    this.productoService.update(this.producto)
    .subscribe( producto => {
      this.router.navigate(['/productos'])
      swal.fire('Producto Actualizado', `Producto ${producto.nombre} actualizado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

}
