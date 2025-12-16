import { Sequelize } from "sequelize";
console.log(process.env.DB_NAME)

const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        logging: false
    }
);

export {sequelize};
