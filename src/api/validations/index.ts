import { Joi } from "celebrate";

/**
 *
 * Middleware encargado de validar los datos recibidos en este caso a través del body y los parametros
 * En caso de no se cumpla alguna regla de validación especificada returna un error especificando que validación falló
 */
export const id_mongo_params = Joi.object({
  id: Joi.string().min(24).max(24).required(),
});
export const dni_to_export = Joi.object({
  dni: Joi.number().required(),
});

export const user_schema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  legajo: Joi.string().required(),
  dni: Joi.number().required(),
  gerencia: Joi.string().required(),
  rol: Joi.string().valid("Gerente", "Supervisor", "Representante").required(),
  nacimiento: Joi.string().required(),
  sector: Joi.string().required(),
  dniJefe: Joi.number(),
});

