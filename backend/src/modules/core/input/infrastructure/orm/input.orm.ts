import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

/**
 * Controller (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define un controlador HTTP tipado que actúa como adaptador entre
 * el mundo externo (Express, HTTP requests/responses) y la aplicación.
 * Su propósito es recibir peticiones, extraer parámetros, ejecutar
 * casos de uso y devolver respuestas formateadas, manteniendo la
 * separación entre dominio e infraestructura.
 *
 * Diferencia con otras capas:
 * - Entity: representa conceptos del negocio con identidad, reglas e invariantes.
 * - UseCase: encapsula operaciones del sistema aplicando reglas de negocio.
 * - Repository: implementa acceso a datos y persistencia.
 * - Controller: orquesta casos de uso en respuesta a peticiones externas,
 *   pero no contiene lógica de negocio ni persistencia.
 *
 * Responsabilidades técnicas:
 * - Recibir y tipar requests mediante `ApiRequest` y `ApiResponse`.
 * - Invocar casos de uso (`GetAll`, `GetById`, `Create`, `Update`, `Delete`).
 * - Formatear respuestas (ej. convertir fechas a ISO).
 * - Manejar respuestas estándar (200 OK, 201 Created, 204 No Content).
 * - Encapsular lógica repetida en helpers privados para mantener el código limpio.
 *
 * Qué hace:
 * - Controla el flujo de entrada/salida de la aplicación vía HTTP.
 * - Orquesta casos de uso y devuelve DTOs formateados.
 * - Asegura tipado estricto en endpoints mediante schemas.
 * - Centraliza lógica repetida como formateo de fechas y manejo de "no found".
 *
 * Qué no hace:
 * - No representa entidades del dominio ni objetos de negocio.
 * - No contiene reglas de negocio ni invariantes.
 * - No implementa persistencia ni interactúa directamente con infraestructura.
 * - No sustituye a los casos de uso; su rol es coordinar su ejecución.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Controller` porque su responsabilidad es
 *   controlar el flujo de entrada/salida HTTP. A diferencia de las `Entity`,
 *   que modelan conceptos del negocio, los `Controller` son adaptadores
 *   externos que conectan la aplicación con el mundo exterior.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y casos de uso.
 * - Features: repositorios y servicios de infraestructura.
 * - Controller: capa de infraestructura HTTP que recibe requests y
 *   orquesta casos de uso.
 * - Orchestrators: pueden agrupar controladores y exponer endpoints
 *   de forma coherente hacia Inputes externos.
 */

interface InputAttributes {
    id: number,
    custom_id?: string | null
    name?: string | null
    description?: string | null,
    sku?: string | null,
    presentation?: string | null,
    unit_of_measure?: string | null,
    storage_conditions?: string | null,
    barcode?: number | null,
    input_types_id?: number | null,
    unit_cost?: number | null,
    supplier?: string | null,
    photo?: string | null,
    is_draft: boolean,
    status: boolean,
    created_at: Date,
    updated_at: Date
};

type InputCreateAttributes = Omit<InputAttributes, "id" | "created_at" | "updated_at">;

type InputUpdateAttributes = Partial<InputCreateAttributes>;


class InputModel extends Model<InputAttributes, InputCreateAttributes> {
    static getEditableFields(): (keyof InputUpdateAttributes)[] {
        return [
            "custom_id", "name", "description", "sku", "presentation",
            "unit_of_measure", "storage_conditions", "barcode", "input_types_id",
            "unit_cost", "supplier", "photo", "is_draft", "photo", "is_draft",
            "status"
        ];
    }
    static getAllFields(): (keyof InputAttributes)[] {
        return [
            "custom_id", "name", "description", "sku", "presentation",
            "unit_of_measure", "storage_conditions", "barcode", "input_types_id",
            "unit_cost", "supplier", "photo", "is_draft", "photo", "is_draft",
            "status", "id", "created_at", "updated_at"
        ];
    }
}

InputModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        custom_id: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        storage_conditions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        unit_of_measure: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
        },
        supplier: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        presentation: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        input_types_id: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: true,
        },
        is_draft: {
            type: DataTypes.TINYINT,
        },
        barcode: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        unit_cost: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: true,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW(),
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        tableName: "inputs",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export { InputModel };
export type { InputAttributes, InputCreateAttributes, InputUpdateAttributes };