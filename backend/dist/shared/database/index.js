"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
// src/shared/database/index.ts
const sequelize_1 = require("../../config/mysql/sequelize");
const init_models_1 = require("./init-models");
const init_associations_1 = require("./init-associations");
async function initializeDatabase() {
    (0, init_models_1.initModels)();
    (0, init_associations_1.initAssociations)();
    await sequelize_1.sequelize.authenticate().then(() => console.log("La conexión con la base de datos fue exitosa."))
        .catch((err) => console.error("Error al conectar la base de datos:", err));
    return sequelize_1.sequelize;
}
;
