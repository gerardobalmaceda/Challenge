import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const confPath =
  process.env.NODE_ENV == "development" ? ".env.development" : ".env";

const envFound = dotenv.config({ path: confPath });

if (!envFound) throw new Error("env file not found");

interface IConfig {
  port: string;
  api: {
    prefix: string;
  };
  emailSender: {
    api_key: string;
    sender: string;
    subject: string;
  };
  dbUri: {
    database: string;
  };
}
const conf: IConfig = {
  port: `${process.env.PORT}`,
  api: {
    prefix: `${process.env.PREFIX}`,
  },
  emailSender: {
    api_key: `${process.env.SENDGRID_API_KEY}`,
    sender: `${process.env.SENDGRID_SENDER}`,
    subject: `${process.env.SUBJECT}`,
  },
  dbUri: {
    database: `${process.env.MONGODB_URI}`,
  },
};
export default conf;
