// src/shared/database/index.ts
import { sequelize } from "@config/mysql/sequelize";
import { initModels } from "./init-models";
import { initAssociations } from "./init-associations";

export async function initializeDatabase() {
    initModels();  
    initAssociations();
    await sequelize.authenticate().then(() => console.log("La conexión con la base de datos fue exitosa."))
        .catch((err: Error) => console.error("Error al conectar la base de datos:", err));
    return sequelize;
};
