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
    interfaz InputAttributes describe el shape del registro, TypeScript
    no copia ni agrega automáticamente esas propiedades a la clase, y Sequelize
    tampoco las define en el código, sino dinámicamente en tiempo de ejecución.
    Por eso, sin declare, TypeScript creería que las propiedades no existen,
    generaría errores al acceder a Input.id o Input.name, y perderías
    autocompletado y tipado estricto. El uso de declare le indica al compilador
    que esas propiedades existirán en runtime aunque no se inicialicen en la
    clase, manteniendo el tipado seguro sin generar código adicional en 
    JavaScript.

*/

interface InputTypeAttributes {
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

type InputTypeCreationAttributes = Partial<Omit<InputTypeAttributes, 'id' | 'created_at' | 'updated_at'>>;

class InputTypeModel extends Model<InputTypeAttributes, InputTypeCreationAttributes> {
    declare id: number;
    declare name: string;
    declare created_at: Date;
    declare updated_at: Date;
    static getAllFields = (): readonly (keyof InputTypeAttributes)[] => ["id", "name", "created_at", "updated_at"];
    static getEditableFields = (): readonly (keyof InputTypeAttributes)[] => ["name"];
}

InputTypeModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: sequelize,
    modelName: "input_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

export { InputTypeModel};
export type {
    InputTypeAttributes,
    InputTypeCreationAttributes
};