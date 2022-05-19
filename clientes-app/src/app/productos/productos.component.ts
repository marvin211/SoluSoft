import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { ModalProdService } from './detalle-prod/modal-prod.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;

  constructor(private productoService: ProductoService,
    private modalProdService: ModalProdService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }

      this.productoService.getProductos(page).pipe(
        tap(response => {
          console.log('ProductosComponent: tap 3');
          (response.content as Producto[]).forEach( producto => {
            console.log(producto.nombre);
          });
        })
      ).subscribe(response => {
        this.productos = response.content as Producto[];
        this.paginador = response;
      });
    });
  }

  delete(producto: Producto): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
        title: "Está seguro?",
        text: `¿Seguro que desea eliminar el producto: ${producto.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.productoService.delete(producto.id).subscribe(
            response => {
              this.productos = this.productos.filter(prod => prod !== producto)
              swalWithBootstrapButtons.fire(
                "Producto eliminado!",
                `Producto: ${producto.nombre} eliminado con éxito.`,
                "success"
              );
            }
          )
        }
        else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se eliminó el producto',
            'error'
          )
        }
      });
  }

  abrirModal(producto: Producto){
    this.productoSeleccionado = producto;
    this.modalProdService.abrirModal();
  }
}
