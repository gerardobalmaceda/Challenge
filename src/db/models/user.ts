import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../../interfaces/IUser";

const UserSchema = new Schema<IUser>(
  {
    nombre: { type: String },
    apellido: { type: String },
    dni: { type: Number },
    nacimiento: { type: String },
    area: { type: String },
    legajo: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      enum: ["Gerente", "Supervisor", "Representante"],
    },

    dniJefe: { Type: Number },
    gerencia: { Type: String },
    sector: { Type: String },
    salt: { type: String, hide: true },
    hash: { type: String, hide: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.hash;
        delete ret.salt;
      },
    },
  }
);
UserSchema.methods.encryptPassword = async function (password: string) {
  this.salt = await bcrypt.genSalt(10);
  this.hash = await bcrypt.hash(password, this.salt);
};
UserSchema.methods.compare = async function (
  password: string
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return this.hash === hash;
};

export default UserSchema;
