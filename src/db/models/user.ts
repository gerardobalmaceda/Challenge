import { Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser";

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String },
    apellido: { type: String },
    dni: { type: Number },
    nacimiento: { type: String },
    legajo: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      enum: ["Gerente", "Supervisor", "Representante"],
    },

    dniJefe: { type: Number },
    gerencia: { type: String },
    sector: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default UserSchema;
