
const ErrorHandler = (err: any) => {
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
  if (err.name === 'BulkWriteError' && err.code === 11000) {
		error.msg = `${err.writeErrors[0].err.errmsg}`;
		error.stCode = 400;
		error.isInternal = false;
	}
  if (error.isInternal) console.log("INTERNAL ERROR ", err);

  return error;
};

export default ErrorHandler;
