import { PSQL_HOST, PSQL_NAME, PSQL_PASS, PSQL_USER } from "../utils/secrets";

export default {
  database: PSQL_NAME,
  username: PSQL_USER,
  password: PSQL_PASS,
  params: {
    dialect: "postgres",
    logging: false,
    operatorsAliases: false,
    host: PSQL_HOST,
    define: {
      underscored: true
    }
  }
};
