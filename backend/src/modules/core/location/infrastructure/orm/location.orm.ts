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

interface LocationAttributes {
    id: number;

    name: string | null;
    description: string | null;
    custom_id: string | null;

    phone: string | null;

    street: string | null;
    street_number: number | null;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zip_code: number | null;

    production_capacity: number | null;
    location_manager: string | null;

    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

type LocationCreateAttributes = Partial<Omit<LocationAttributes, "created_at" | "updated_at" | "id">>;

class LocationModel extends Model<LocationAttributes, LocationCreateAttributes> {

    declare id: number;
    declare name: string | null;
    declare description: string | null;
    declare custom_id: string | null;
    declare phone: string | null;
    declare street: string | null;
    declare street_number: number | null;
    declare neighborhood: string | null;
    declare city: string | null;
    declare state: string | null;
    declare country: string | null;
    declare zip_code: number | null;
    declare production_capacity: number | null;
    declare location_manager: string | null;
    declare is_active: boolean;
    declare created_at: Date;
    declare updated_at: Date;

    // STATIC METHODS preserved exactly from your original service design
    static getEditableFields = (): readonly (keyof LocationAttributes)[] => [
        "name", "description", "phone",
        "street", "street_number", "neighborhood",
        "city", "state", "country", "zip_code",
        "production_capacity", "location_manager", "custom_id",
        "is_active"
    ] as const;

    static getAllFields = (): readonly (keyof LocationAttributes)[] => [
        "id", "name", "description",
        "phone",
        "street", "street_number", "neighborhood",
        "city", "state", "country", "zip_code",
        "production_capacity", "location_manager", "custom_id",
        "is_active", "created_at", "updated_at",
    ] as const;
}

LocationModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    production_capacity: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    location_manager: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    custom_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },

    phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },

    street: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    zip_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    is_active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
},
    {
        sequelize,
        tableName: "locations",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export { LocationModel };
export type {
    LocationAttributes,
    LocationCreateAttributes
};