import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalProdService {

  modal: boolean = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }

}
