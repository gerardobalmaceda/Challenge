export interface IUser extends Document {
  _id: string;
  nombre: string;
  apellido: string;
  legajo: string;
  dni: number;
  nacimiento: any;
  rol: string;
  dniJefe: number;
  gerencia: string;
  sector: string;
}
