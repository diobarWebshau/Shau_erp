import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/mysql/sequelize";

/**
 * Infrastructure Model (Sequelize)
 * ------------------------------------------------------------------
 * Define el modelo de persistencia en la capa de infraestructura,
 * utilizando Sequelize para mapear la entidad a la base de datos.
 * Este archivo describe cómo se almacenan y manipulan los datos
 * en la tabla correspondiente, incluyendo tipos, restricciones
 * y configuración de timestamps.
 *
 * Función técnica:
 * - Representar la estructura exacta de la tabla en la base de datos.
 * - Definir atributos, tipos de datos y reglas de persistencia (ej. primaryKey, allowNull).
 * - Proveer métodos estáticos para obtener campos completos o editables.
 * - Encapsular la lógica de inicialización del modelo con `Model.init`.
 *
 * Qué hace:
 * - Actúa como contrato de infraestructura entre el ORM y la base de datos.
 * - Permite operaciones CRUD a través de Sequelize.
 * - Garantiza que los datos se almacenen con tipos y restricciones correctas.
 * - Expone atributos tipados mediante `declare` para mantener autocompletado
 *   y tipado estricto en TypeScript.
 *
 * Qué no hace:
 * - No representa el concepto del negocio (eso corresponde a la Entity en el dominio).
 * - No contiene reglas de negocio ni invariantes.
 * - No sustituye a los DTOs ni a los Props del dominio.
 * - No debe confundirse con tipos puros del dominio, ya que depende de Sequelize
 *   y de la infraestructura de persistencia.
 *
 * Convención de nombres:
 * - `Attributes`: describe el shape del registro tal como lo maneja el ORM.
 * - `CreationAttributes`: describe los campos requeridos para crear un registro
 *   en la base de datos (sin id ni timestamps).
 * - `Model`: clase que extiende `Sequelize.Model` y define propiedades con `declare`
 *   para mantener tipado seguro en tiempo de compilación.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y tipos puros del dominio.
 * - Features: modelos de infraestructura como este, que implementan persistencia.
 * - UseCases: consumen repositorios que internamente usan estos modelos.
 * - Orchestrators: exponen endpoints que terminan invocando casos de uso,
 *   los cuales delegan en repositorios que interactúan con el modelo.
 */

/*
    Debes declarar las propiedades en la clase del modelo porque, aunque la 
    interfaz LocationAttributes describe el shape del registro, TypeScript
    no copia ni agrega automáticamente esas propiedades a la clase, y Sequelize
    tampoco las define en el código, sino dinámicamente en tiempo de ejecución.
    Por eso, sin declare, TypeScript creería que las propiedades no existen,
    generaría errores al acceder a location.id o location.name, y perderías
    autocompletado y tipado estricto. El uso de declare le indica al compilador
    que esas propiedades existirán en runtime aunque no se inicialicen en la
    clase, manteniendo el tipado seguro sin generar código adicional en 
    JavaScript.

*/

interface ProductProcessAttributes {
    id: number;
    product_id: number,
    process_id: number,
    sort_order: number
}

type ProductProcessCreateAttributes = Partial<Omit<ProductProcessAttributes, "id">>;
type ProductProcessUpdateAttributes = ProductProcessCreateAttributes;

class ProductProcessModel extends Model<ProductProcessAttributes, ProductProcessCreateAttributes> {
    declare id: number;
    declare product_id: number;
    declare process_id: number;
    declare sort_order: number;
    static getEditableFields = (): readonly (keyof ProductProcessUpdateAttributes)[] => [
        "process_id", "process_id", "sort_order"
    ] as const;

    static getAllFields = (): readonly (keyof ProductProcessAttributes)[] => [
        "id", "process_id", "product_id", "sort_order"
    ] as const;
}

ProductProcessModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    process_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "products_processes",
    timestamps: false,
});

export { ProductProcessModel };
export type {
    ProductProcessAttributes,
    ProductProcessCreateAttributes
}