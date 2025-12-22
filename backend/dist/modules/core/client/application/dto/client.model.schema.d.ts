import { z } from "zod";
/**
 * Schemas
 * ------------------------------------------------------------------
 * Definen la estructura y reglas de validación de los datos
 * en la capa de aplicación. Se implementan con Zod y sirven
 * como contratos formales entre las distintas capas del sistema.
 *
 * Función técnica:
 * - Especificar qué atributos son requeridos, opcionales o generados.
 * - Validar tipos y formatos de los datos recibidos o devueltos.
 * - Garantizar consistencia entre la entrada, la actualización
 *   y la respuesta de la API.
 *
 * Qué hacen:
 * - Actúan como contratos de validación y tipado.
 * - Centralizan las reglas de datos para evitar duplicación.
 * - Se integran con los DTOs para mantener coherencia en el código.
 *
 * Qué no hacen:
 * - No contienen lógica de negocio ni reglas de dominio.
 * - No gestionan persistencia ni infraestructura.
 * - No sustituyen a los casos de uso, solo los complementan
 *   asegurando que los datos cumplan con las reglas definidas.
 *
 * Convención de nombres:
 * Se nombran con sufijos como `CreateSchema`, `UpdateSchema` y `ResponseSchema`
 * para indicar su propósito dentro del ciclo de vida de los datos.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y reglas de negocio.
 * - Schemas: contratos de validación y tipado de datos.
 * - DTOs: tipos derivados de los schemas para transporte seguro.
 * - UseCases: orquestan operaciones usando schemas y DTOs.
 * - Orchestrators: exponen endpoints que consumen estos contratos.
 */
/**
 * CreateSchema
 * ------------------------------------------------------------------
 * Define los campos requeridos para crear un registro mediante POST.
 * Aqui todos los atributos son obligatorios y se validan según su tipo.
 *
 * Comentario complementario:
 * - Este schema representa el contrato de entrada HTTP para la operación CREATE.
 * - No incluye campos generados por el sistema como `id` o timestamps.
 * - La obligatoriedad aquí refleja lo que la API exige, no necesariamente
 *   todas las reglas del dominio interno.
 */
declare const clientCreateSchema: z.ZodObject<{
    company_name: z.ZodString;
    tax_id: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    street: z.ZodString;
    street_number: z.ZodNumber;
    neighborhood: z.ZodString;
    payment_terms: z.ZodNullable<z.ZodString>;
    zip_code: z.ZodNumber;
    credit_limit: z.ZodNullable<z.ZodNumber>;
    tax_regimen: z.ZodNullable<z.ZodString>;
    cfdi: z.ZodString;
    payment_method: z.ZodNullable<z.ZodString>;
    is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
}, z.core.$strip>;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 *
 * Comentario complementario:
 * - La semántica de PATCH implica actualización parcial.
 * - Este schema permite enviar solo los campos que se desean modificar.
 * - Las restricciones de qué campos pueden o no actualizarse se controlan
 *   en capas posteriores (casos de uso o dominio).
 */
declare const clientUpdateSchema: z.ZodObject<{
    company_name: z.ZodOptional<z.ZodString>;
    tax_id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    street: z.ZodOptional<z.ZodString>;
    street_number: z.ZodOptional<z.ZodNumber>;
    neighborhood: z.ZodOptional<z.ZodString>;
    payment_terms: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zip_code: z.ZodOptional<z.ZodNumber>;
    credit_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    tax_regimen: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cfdi: z.ZodOptional<z.ZodString>;
    payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto COMPLETO que la API devuelve.
 * El output sigue siendo exactamente igual al original.
 *
 * Comentario complementario:
 * - Este schema define el contrato de salida HTTP.
 * - Las fechas se representan como string porque HTTP no transporta `Date`.
 * - No implica que el dominio use strings internamente para fechas.
 */
declare const clientResponseSchema: z.ZodObject<{
    company_name: z.ZodString;
    tax_id: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    street: z.ZodString;
    street_number: z.ZodNumber;
    neighborhood: z.ZodString;
    payment_terms: z.ZodNullable<z.ZodString>;
    zip_code: z.ZodNumber;
    credit_limit: z.ZodNullable<z.ZodNumber>;
    tax_regimen: z.ZodNullable<z.ZodString>;
    cfdi: z.ZodString;
    payment_method: z.ZodNullable<z.ZodString>;
    is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
/**
 * QuerySchema
 * ------------------------------------------------------------------
 * Define los parámetros de consulta aceptados por endpoints GET.
 *
 * Comentario complementario:
 * - Este schema modela exclusivamente datos provenientes del query string.
 * - En HTTP todos los valores llegan como string o string[].
 * - El uso de `z.union([string, string[]])` refleja el comportamiento real
 *   de Express cuando un parámetro se repite en la URL.
 * - La conversión de tipos (string → number/boolean) se realiza posteriormente
 *   en el controller o en una capa de normalización.
 */
declare const clientQuerySchema: z.ZodObject<{
    filter: z.ZodOptional<z.ZodString>;
    exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    company_name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    tax_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    city: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    state: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    country: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    street: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    neighborhood: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    tax_regimen: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    payment_terms: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    cfdi: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
}, z.core.$strict>;
/**
 * Data Transfer Objects (DTO)
 * ------------------------------------------------------------------
 * Representan tipos derivados directamente de los esquemas de validación.
 * Se generan automáticamente mediante `z.infer` a partir de los schemas Zod,
 * asegurando que el tipado de la aplicación esté alineado con las reglas
 * de validación definidas en la capa de dominio o aplicación.
 *
 * Función técnica:
 * - Tipar la entrada de datos en operaciones de creación y actualización.
 * - Tipar la salida de datos en respuestas de la API o capa superior.
 * - Garantizar consistencia entre validación (schemas) y uso en el código.
 * - Reducir duplicación de definiciones, ya que los tipos se derivan de los
 *   mismos esquemas que validan la información.
 *
 * Qué hacen:
 * - Actúan como contratos de datos entre capas de la aplicación.
 * - Permiten que controladores, casos de uso y repositorios trabajen con
 *   estructuras tipadas y seguras.
 * - Facilitan el mantenimiento al centralizar las definiciones en los schemas.
 *
 * Qué no hacen:
 * - No contienen lógica de negocio ni validaciones propias.
 * - No representan entidades del dominio, solo estructuras de datos.
 * - No gestionan persistencia ni infraestructura.
 * - No sustituyen a los schemas, sino que los complementan en el tipado.
 *
 * Convención de nombres:
 * Se nombran con el sufijo `Dto` para indicar que son objetos de transferencia
 * de datos. Esto los diferencia de las entidades del dominio y de los casos de uso,
 * dejando claro que su propósito es transportar información validada entre capas.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y reglas de negocio.
 * - Features: implementa infraestructura y repositorios.
 * - DTOs: sirven como contratos de datos derivados de schemas, usados por casos de uso
 *   y orquestadores para garantizar integridad en la comunicación.
 * - Orchestrators: consumen estos DTOs para exponer datos tipados y consistentes
 *   hacia el exterior (ej. controladores, endpoints).
 *
 * Comentario complementario:
 * - Los DTOs se derivan siempre de los schemas para evitar divergencias.
 * - Nunca deben definirse manualmente si ya existe un schema Zod.
 */
type ClientCreateDto = z.infer<typeof clientCreateSchema>;
type ClientUpdateDto = z.infer<typeof clientUpdateSchema>;
type ClientResponseDto = z.infer<typeof clientResponseSchema>;
type ClientQueryDto = z.infer<typeof clientResponseSchema>;
export { clientCreateSchema, clientUpdateSchema, clientResponseSchema, clientQuerySchema };
export type { ClientCreateDto, ClientUpdateDto, ClientResponseDto, ClientQueryDto };
