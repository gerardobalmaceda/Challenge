/**
 * En este manejador de errores, se envían aquellos que no tienen un código HTTP asociado.
 * Por defecto se lo marca como error interno del servidor y se le asigna un codigo 500
 * También se utiliza el manejador de errores para analizar los mismos y asignarles un código y mensaje adecuados
 * @param err
 * @returns
 */

const ErrorHandler = (err: any) => {
  let error = {
    msg: err.msg || "INTERNAL SERVER ERROR",
    stCode: 500,
    isInternal: true,
  };
  if (err.name === "BulkWriteError" || err.code === 11000) {
    error.msg = `Verifique los datos ingresados. El DNI o legajo ya se encuentran asociados a otro usuario`;
    error.stCode = 400;
    error.isInternal = false;
  }
  if (error.isInternal) console.log("INTERNAL ERROR ", err);

  return error;
};

export default ErrorHandler;
