import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginacion-nav',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit, OnChanges {

  @Input() paginador: any;

  paginas: number[];

  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginacion();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];

    if(paginadorActualizado.previousValue) {
      this.initPaginacion();
    }
  }

  private initPaginacion(): void {
    this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
    this.hasta = Math.max( Math.min(this.paginador.totalPages, this.paginador.number+4), 6);

    if(this.paginador.totalPages>5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}
