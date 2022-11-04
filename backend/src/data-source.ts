import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URI,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
});
