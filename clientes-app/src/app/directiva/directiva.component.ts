import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  listaDevs: string[] = [
    'Marvin López: Jefe de Proyecto',
    'Bairon Pérez: Analista del Sistema',
    'Rony Barán: Desarrollador de Base de Datos',
    'Keyzer Hernández: Desarrollador FrontEnd',
    'Erich Gálvez: Desarrollador BackEnd'];

  constructor() { }
}
