import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model} from "sequelize";

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
 *   de forma coherente hacia clientes externos.
 */

interface ClientAddressAttributes {
    id: number,
    client_id: number,
    city: string,
    state: string,
    country: string,
    street: string,
    street_number: number,
    neighborhood: string,
    zip_code: number,
    created_at: Date,
    updated_at: Date,
};

type ClientAddressCreateAttributes = Omit<ClientAddressAttributes, "id" | "created_at" | "updated_at">;

type ClientAddressUpdateAttributes = Partial<ClientAddressCreateAttributes>;

class ClientAddressModel extends Model<ClientAddressAttributes, ClientAddressCreateAttributes> {

    declare id: number;
    declare client_id: number;
    declare city: string;
    declare state: string;
    declare country: string;
    declare street: string;
    declare street_number: number;
    declare neighborhood: string;
    declare zip_code: number;
    declare created_at: Date;
    declare updated_at: Date;

    static getEditableFields = (): readonly (keyof ClientAddressCreateAttributes)[] => [
        "city", "client_id", "country",
        "neighborhood", "state", "street", "street_number",
        "zip_code"
    ] as const;

    static getAllFields = (): readonly (keyof ClientAddressAttributes)[] => [
        "city", "client_id", "country", "created_at", "id",
        "neighborhood", "state", "street", "street_number",
        "updated_at", "zip_code"
    ] as const;
};

ClientAddressModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: "clients"
        }
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: "clients_addresses",
    sequelize: sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export { ClientAddressModel };
export type { ClientAddressAttributes, ClientAddressCreateAttributes, ClientAddressUpdateAttributes };