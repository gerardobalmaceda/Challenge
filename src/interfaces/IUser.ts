import { PopulatedDoc } from "mongoose";

export interface IUser extends Document {
  _id: string;
  nombre: string;
  apellido: string;
  legajo: string;
  dni: number;
  nacimiento: Date;
  rol: string;
  dniJefe: number;
  gerencia: string;
  sector: string
  salt: string;
  hash: string;
  updatedAt: string;
  createdAt: string;
  encryptPassword(pass: string): Promise<string>;
  compare(pass: string): Promise<boolean>;
}
export interface IUserSignUp extends Partial<IUser> {
  password: string;
  passwordConfirmation: string;
}
export interface IUserToken {
  email: string;
}

export interface IChangePassword {
  password: string;
  passwordConfirmation: string;
}
