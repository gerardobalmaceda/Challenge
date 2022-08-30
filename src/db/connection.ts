import mongoose from "mongoose";
import conf from "../config";

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const database = mongoose.createConnection(conf.dbUri.database, connOptions);

export default { database };
