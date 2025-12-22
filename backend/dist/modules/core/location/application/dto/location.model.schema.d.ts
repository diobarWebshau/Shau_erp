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
 */
declare const locationCreateSchema: z.ZodObject<{
    name: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    street: z.ZodNullable<z.ZodString>;
    custom_id: z.ZodNullable<z.ZodString>;
    location_manager: z.ZodNullable<z.ZodString>;
    street_number: z.ZodNullable<z.ZodNumber>;
    neighborhood: z.ZodNullable<z.ZodString>;
    city: z.ZodNullable<z.ZodString>;
    state: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    zip_code: z.ZodNullable<z.ZodNumber>;
    phone: z.ZodNullable<z.ZodString>;
    production_capacity: z.ZodNullable<z.ZodNumber>;
    is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
}, z.core.$strip>;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 */
declare const locationUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    street_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    neighborhood: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    zip_code: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    production_capacity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto completo que devuelve la API en las respuestas.
 * Incluye los campos de creación más los metadatos generados por el sistema.
 */
declare const locationResponseSchema: z.ZodObject<{
    name: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    street: z.ZodNullable<z.ZodString>;
    custom_id: z.ZodNullable<z.ZodString>;
    location_manager: z.ZodNullable<z.ZodString>;
    street_number: z.ZodNullable<z.ZodNumber>;
    neighborhood: z.ZodNullable<z.ZodString>;
    city: z.ZodNullable<z.ZodString>;
    state: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    zip_code: z.ZodNullable<z.ZodNumber>;
    phone: z.ZodNullable<z.ZodString>;
    production_capacity: z.ZodNullable<z.ZodNumber>;
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
declare const locationQuerySchema: z.ZodObject<{
    filter: z.ZodOptional<z.ZodString>;
    exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
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
 */
type LocationCreateDto = z.infer<typeof locationCreateSchema>;
type LocationResponseDto = z.infer<typeof locationResponseSchema>;
type LocationUpdateDto = z.infer<typeof locationUpdateSchema>;
type LocationQuerySchema = z.infer<typeof locationQuerySchema>;
export { locationCreateSchema, locationResponseSchema, locationUpdateSchema, locationQuerySchema, };
export type { LocationResponseDto, LocationCreateDto, LocationUpdateDto, LocationQuerySchema };
