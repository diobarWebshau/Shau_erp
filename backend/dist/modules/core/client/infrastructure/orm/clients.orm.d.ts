import { Model, Optional } from "sequelize";
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
interface ClientAttributes {
    id: number;
    company_name: string;
    tax_id: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    street: string;
    street_number: number;
    neighborhood: string;
    payment_terms: string | null;
    credit_limit: number | null;
    zip_code: number;
    tax_regimen: string | null;
    cfdi: string;
    payment_method: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
type ClientCreateAttributes = Optional<ClientAttributes, "id" | "created_at" | "updated_at" | "payment_terms" | "credit_limit" | "tax_regimen" | "payment_method">;
type ClientUpdateAttributes = Partial<Omit<ClientAttributes, "id" | "created_at" | "updated_at">>;
declare class ClientModel extends Model<ClientAttributes, ClientCreateAttributes> {
    id: number;
    company_name: string;
    tax_id: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    street: string;
    street_number: number;
    neighborhood: string;
    payment_terms: string | null;
    credit_limit: number | null;
    zip_code: number;
    tax_regimen: string | null;
    cfdi: string;
    payment_method: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    static getEditableFields: () => readonly (keyof ClientCreateAttributes)[];
    static getAllFields: () => readonly (keyof ClientAttributes)[];
}
export { ClientModel };
export type { ClientAttributes, ClientCreateAttributes, ClientUpdateAttributes };
