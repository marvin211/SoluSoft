import { Factura } from '../facturas/models/factura';

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  nit: string;
  telefono: string;
  createAt: string;
  foto: string;
  facturas: Array<Factura> = [];
}
