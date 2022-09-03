export interface IUser extends Document {
  _id: string;
  nombre: string;
  apellido: string;
  legajo: string;
  dni: number;
  nacimiento: string;
  rol: string;
  dniJefe: number;
  gerencia: string;
  sector: string;
  superior: IUser[];
}

export interface IUserUpload {
  Nombre: string;
  Apellido: string;
  Legajo: string;
  DNI: number;
  Rol: string;
  Gerencia: string;
  Sector: string;
  "DNI Jefe": number;
  "Fecha cumpleaños": string;
}

export interface IUserExport {
  "Apellido y Nombre": string;
  legajo: string;
  dni: number;
  rol: string;
  gerencia: string;
  sector: string;
  edad: number;
  "Superior inmediato": string;
}
