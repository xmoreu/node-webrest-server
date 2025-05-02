import Sequelize from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

export const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'netflixdb',
    user: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306,
    
  });