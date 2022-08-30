import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const confPath =
  process.env.NODE_ENV == "development" ? ".env.development" : ".env";

const envFound = dotenv.config({ path: confPath });

if (!envFound) throw new Error("env file not found");


interface IConfig {
    baseUrl: string;
    port: string;
    domain: string;
    api: {
      prefix: string;
      API_GATEWAY: string;
    };
    client: {
      url: string;
    };
    dbUri: {
      database: string;
    };
    token: {
      secret: string;
      expiresIn: string;
      hashEmail: string;
    };
  }
  const conf: IConfig = {
    baseUrl: `${process.env.URL_THIS_SERVICE}`,
    port: `${process.env.PORT}`,
    domain: `${process.env.DOMAIN}`,
    client: {
      url: `${process.env.CLIENT_URL}`,
    },
    api: {
      prefix: "/v1/api",
      API_GATEWAY: `${process.env.API_GATEWAY}`,
    },
    token: {
      secret: `${process.env.TOKEN_SECRET}`,
      expiresIn: `${process.env.TOKEN_EXPIRE}`,
      hashEmail: `${process.env.TOKEN_EMAIL}`,
    },
    dbUri: {
      database: `${process.env.MONGODB_URI}`,
    },
  };
  export default conf;
  