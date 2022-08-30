import ErrorCreator from "../../services/helpers/errorCreator";

const ErrorHandler = (err: ErrorCreator) => {
  let error = {
    msg: err.msg || "INTERNAL SERVER ERROR",
    stCode: 500,
    isInternal: true,
  };
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    error = {
      msg: "Wrong or expired token",
      stCode: 401,
      isInternal: false,
    };
  }
  if (error.isInternal) console.log("INTERNAL ERROR ", err);

  return error;
};

export default ErrorHandler;
