"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = initModels;
const location_production_line_orm_1 = require("../../modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm");
const product_discount_range_orm_1 = require("../../modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm");
const product_discount_client_orm_1 = require("../../modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm");
const location_location_type_orm_1 = require("../../modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm");
const product_process_orm_1 = require("../../modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm");
const product_inputs_orm_1 = require("../../modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm");
const client_address_orm_1 = require("../../modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm");
const production_lines_orm_1 = require("../../modules/core/production-line/infrastructure/orm/production-lines.orm");
const location_type_orm_1 = require("../../modules/core/location-type/infrastructure/orm/location-type.orm");
const input_type_orm_1 = require("../../modules/core/input-type/infrastructure/orm/input-type.orm");
const location_orm_1 = require("../../modules/core/location/infrastructure/orm/location.orm");
const process_orm_1 = require("../../modules/core/process/infrastructure/orm/process.orm");
const product_orm_1 = require("../../modules/core/product/infrastructure/orm/product.orm");
const clients_orm_1 = require("../../modules/core/client/infrastructure/orm/clients.orm");
const input_orm_1 = require("../../modules/core/input/infrastructure/orm/input.orm");
/**
 * init-models.ts
 * ------------------------------------------------------------------
 * Registro centralizado de modelos Sequelize en la capa de
 * infraestructura compartida.
 *
 * En la arquitectura Clean + Modular utilizada en el ERP, cada módulo
 * define su propio modelo Sequelize dentro de su carpeta de
 * infraestructura. Sin embargo, **Sequelize no reconoce automáticamente
 * esos modelos al instanciar la conexión**, por lo que deben ser
 * importados explícitamente para que sus definiciones sean cargadas,
 * registradas y disponibles en tiempo de ejecución.
 *
 * Función técnica:
 * - Forzar la carga de *todos* los modelos de infraestructura del sistema.
 * - Garantizar que cada archivo de modelo ejecute internamente su `Model.init`.
 * - Registrar en Sequelize la metadata necesaria para que, más adelante,
 *   las asociaciones (`hasMany`, `belongsTo`, etc.) puedan configurarse
 *   correctamente en `init-associations.ts`.
 *
 * Qué hace:
 * - Importa y expone las clases de modelo ya inicializadas.
 * - Asegura que Sequelize tenga registradas todas las tablas antes de
 *   configurar las relaciones.
 * - Centraliza el listado completo de modelos sin mezclarlo con la lógica
 *   de asociaciones.
 *
 * Qué NO hace:
 * - No define asociaciones (eso corresponde a `init-associations.ts`).
 * - No define reglas de negocio.
 * - No representa conceptos del dominio (solo infraestructura de persistencia).
 *
 * ¿Por qué no juntar modelos y asociaciones en un solo archivo?
 * ------------------------------------------------------------------
 * Aunque parece más sencillo unirlos, separarlos es una **práctica esencial**
 * en sistemas grandes porque:
 *
 * 1. Evita ciclos de importación entre modelos.
 * 2. Garantiza que todos los modelos ya fueron cargados antes de asociarlos.
 * 3. Permite testear modelos y asociaciones por separado.
 * 4. Mantiene responsabilidades limpias (SRP):
 *        - init-models → cargar definiciones
 *        - init-associations → relacionarlas
 * 5. Sigue el flujo natural de Sequelize:
 *        A) registrar modelos
 *        B) registrar asociaciones
 *
 * Convención usada:
 * - Cada modelo ya contiene su propio `Model.init` en su archivo.
 * - Aquí simplemente se importa el archivo, lo cual ejecuta la inicialización.
 * - Luego este módulo devuelve un diccionario de modelos disponibles.
 *
 * Ubicación dentro de la arquitectura:
 * - /shared/database/init-models.ts
 *     Parte del subsistema de infraestructura transversales del ERP.
 *     Es consumido por:
 *       → init-associations.ts (para definir relaciones)
 *       → bootstrap de la aplicación (para ejecutar sync, migrations o seeds)
 *
 * Importante:
 * Node.js utiliza un cache interno de módulos (MCRM – Module Cache Reference Model),
 * por lo que todas las importaciones de un modelo hacen referencia a **la misma
 * instancia de clase**, garantizando que todas las asociaciones aplicadas en
 * `init-associations.ts` serán visibles desde cualquier módulo de la aplicación.
 */
function initModels() {
    return {
        LocationProductionLineModel: location_production_line_orm_1.LocationProductionLineModel,
        ProductDiscountRangeModel: product_discount_range_orm_1.ProductDiscountRangeModel,
        LocationLocationTypeModel: location_location_type_orm_1.LocationLocationTypeModel,
        ProductDiscountClientModel: product_discount_client_orm_1.ProductDiscountClientModel,
        ProductProcessModel: product_process_orm_1.ProductProcessModel,
        ProductInputModel: product_inputs_orm_1.ProductInputModel,
        ClientAddressModel: client_address_orm_1.ClientAddressModel,
        ProductionLineModel: production_lines_orm_1.ProductionLineModel,
        LocationTypeModel: location_type_orm_1.LocationTypeModel,
        InputTypeModel: input_type_orm_1.InputTypeModel,
        LocationModel: location_orm_1.LocationModel,
        ProcessModel: process_orm_1.ProcessModel,
        ProductModel: product_orm_1.ProductModel,
        ClientModel: clients_orm_1.ClientModel,
        InputModel: input_orm_1.InputModel
    };
}
;
