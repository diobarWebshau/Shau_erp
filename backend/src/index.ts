import "@config/env/env.loader";
import { sequelize } from "./config/mysql/sequelize.js";
import createServer from "./server.js";

try {
    createServer();
    sequelize.authenticate().then(() => console.log("La conexión con la base de datos fue exitosa."))
        .catch((err: Error) => console.error("Error al conectar la base de datos:", err));
} catch (error: unknown) {
    if (error instanceof Error) console.error(`Un error inesperado ha ocurrido:  ${error}`);
}