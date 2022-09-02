import { Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser";

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String },
    apellido: { type: String },
    dni: { type: Number, unique: true },
    nacimiento: { type: String },
    area: { type: String },
    legajo: {
      type: String,
      unique: true,
    },
    rol: {
      type: String,
      required: true,
      enum: ["Gerente", "Supervisor", "Representante"],
    },

    dniJefe: { type: Number, ref: 'User' },
    gerencia: { type: String },
    sector: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default UserSchema;
