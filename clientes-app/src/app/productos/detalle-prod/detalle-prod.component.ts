import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { ModalProdService } from './modal-prod.service';

@Component({
  selector: 'detalle-producto',
  templateUrl: './detalle-prod.component.html',
  styleUrls: ['./detalle-prod.component.css']
})
export class DetalleProdComponent implements OnInit {

  @Input() producto: Producto;
  titulo: string = "Detalle del producto";

  constructor(public modalProdService: ModalProdService) { }

  ngOnInit(): void { }

  cerrarModal(){
    this.modalProdService.cerrarModal();
  }

}
