import { Component } from '@angular/core';

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

  title = 'Sistema MasterController';

  empresa: string = 'SoluSoft';

  habilitar: boolean = false;

  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar == false) ? true : false;
  }
}
