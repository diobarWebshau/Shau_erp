import { GetInputByCustomIdUseCase } from "../../application/use-cases/get-input-by-custom-id.usecase";
import { GetInputByBarcodeUseCase } from "../../application/use-cases/get-input-by-barcode.usecase";
import { GetInputBySkuIdUseCase } from "../../application/use-cases/get-input-by-sku.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetInputByIdUseCase } from "../../application/use-cases/get-input-by-id.usecase";
import { GetInputByNameCase } from "../../application/use-cases/get-input-by-name.usecase";
import { GetAllInputsUseCase } from "../../application/use-cases/get-all-inputs.usecase";
import { CreateInputUseCase } from "../../application/use-cases/create-input.usecase";
import { DeleteInputUseCase } from "../../application/use-cases/delete-input.usecase";
import { LocalFileCleanupService } from "@shared/files/local-file-cleanup.service";
import { UpdateInputUseCase } from "../../application/use-cases/update-input.usecase";
import { InputProps, InputSearchCriteria } from "../../domain/input.types"
import { InputResponseDto } from "../../application/dto/input.model.schema";
import { InputRepository } from "../repository/input.repository";
import {
    DeleteinputSchema, GetAllinputsSchema, GetByBarcodeinputSchema,
    GetByCustomIdinputSchema, GetByIdinputSchema, CreateinputSchema,
    GetByNameinputSchema, GetBySkuinputSchema, UpdateinputSchema
} from "../../application/dto/input.endpoint.schema";
import { mapInputQueryToCriteria } from "./input-query-mapper";
import ImageHandler from "@helpers/imageHandlerClass";

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

export class InputController {

    private readonly repo: InputRepository;
    private readonly fileCleanup: LocalFileCleanupService;
    private readonly getAllUseCase: GetAllInputsUseCase;
    private readonly getByIdUseCase: GetInputByIdUseCase;
    private readonly getByNameUseCase: GetInputByNameCase;
    private readonly getByBarcodeUseCase: GetInputByBarcodeUseCase;
    private readonly getBySkuUseCase: GetInputBySkuIdUseCase;
    private readonly getByCustomIdUseCase: GetInputByCustomIdUseCase;
    private readonly createUseCase: CreateInputUseCase;
    private readonly updateUseCase: UpdateInputUseCase;
    private readonly deleteUseCase: DeleteInputUseCase;

    constructor() {
        this.repo = new InputRepository();
        this.fileCleanup = new LocalFileCleanupService();

        this.getAllUseCase = new GetAllInputsUseCase(this.repo);
        this.getByIdUseCase = new GetInputByIdUseCase(this.repo);
        this.getByNameUseCase = new GetInputByNameCase(this.repo);
        this.getByBarcodeUseCase = new GetInputByBarcodeUseCase(this.repo);
        this.getBySkuUseCase = new GetInputBySkuIdUseCase(this.repo);
        this.getByCustomIdUseCase = new GetInputByCustomIdUseCase(this.repo);
        this.createUseCase = new CreateInputUseCase(this.repo);
        this.updateUseCase = new UpdateInputUseCase(this.repo);
        this.deleteUseCase = new DeleteInputUseCase(
            this.repo,
            this.fileCleanup
        );
    }

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private async formatResponse(input: InputProps): Promise<InputResponseDto> {
        return {
            ...input,
            photo: input.photo ? await ImageHandler.convertToBase64(input.photo) : null,
            created_at: input.created_at.toISOString(),
            updated_at: input.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllinputsSchema>, res: ApiResponse<GetAllinputsSchema>) => {
        const queryRequest: GetAllinputsSchema["query"] = req.query;
        const query: InputSearchCriteria = mapInputQueryToCriteria(queryRequest);
        const result: InputProps[] = await this.getAllUseCase.execute(query)
        const formatted: InputResponseDto[] = await Promise.all(
            result.map(p => this.formatResponse(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdinputSchema>, res: ApiResponse<GetByIdinputSchema>) => {
        const { id }: GetByIdinputSchema["params"] = req.params
        const result: InputProps | null = await this.getByIdUseCase.execute(id);
        if (!result) return res.status(204).send(null);
        const formatted: InputResponseDto = await this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY CustomID
    // ============================================================
    getByCustomId = async (req: ApiRequest<GetByCustomIdinputSchema>, res: ApiResponse<GetByCustomIdinputSchema>) => {
        const { custom_id }: GetByCustomIdinputSchema["params"] = req.params
        const result: InputProps | null = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result) return res.status(204).send(null);
        const formatted: InputResponseDto = await this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY SKU
    // ============================================================
    getBySku = async (req: ApiRequest<GetBySkuinputSchema>, res: ApiResponse<GetBySkuinputSchema>) => {
        const { sku }: GetBySkuinputSchema["params"] = req.params
        const result: InputProps | null = await this.getBySkuUseCase.execute(sku);
        if (!result) return res.status(204).send(null);
        const formatted: InputResponseDto = await this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameinputSchema>, res: ApiResponse<GetByNameinputSchema>) => {
        const { name }: GetByNameinputSchema["params"] = req.params
        const result: InputProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        const formatted: InputResponseDto = await this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByBarcode = async (req: ApiRequest<GetByBarcodeinputSchema>, res: ApiResponse<GetByBarcodeinputSchema>) => {
        const { barcode }: GetByBarcodeinputSchema["params"] = req.params
        const result: InputProps | null = await this.getByBarcodeUseCase.execute(Number(barcode));
        if (!result) return res.status(204).send(null);
        const formatted: InputResponseDto = await this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateinputSchema>, res: ApiResponse<CreateinputSchema>) => {
        const body: CreateinputSchema["body"] = req.body;
        try {
            const created: InputProps = await this.createUseCase.execute(body);
            const formatted: InputResponseDto = await this.formatResponse(created);
            return res.status(201).send(formatted);
        } catch (error) {
            // 🧹 LIMPIEZA DE IMAGEN TEMPORAL SI FALLA EL CREATE
            // Esto cubre:
            // - validaciones de negocio
            // - errores de repositorio
            // - errores antes de mover la imagen
            if (body?.photo) {
                try { await ImageHandler.removeImageIfExists(body.photo); }
                catch { /* silencio intencional (best-effort cleanup)*/ }
            }
            throw error; // dejar que el middleware global maneje la respuesta
        }
    };
    // ============================================================
    // UPDATE (BODY-DRIVEN IMAGE MOVE — FINAL DEFINITIVO)
    // ============================================================
    update = async (req: ApiRequest<UpdateinputSchema>, res: ApiResponse<UpdateinputSchema>) => {
        const { id }: UpdateinputSchema["params"] = req.params;

        // ⛔ Clonar body para no mutar req.body
        const body: UpdateinputSchema["body"] = { ...req.body };

        let tmpPhotoPath: string | undefined;
        let finalPhotoPath: string | undefined;
        let previousPhotoPath: string | null = null;

        try {
            // -----------------------------------------------------------
            // 1️⃣ OBTENER FOTO ACTUAL (ANTES DE MODIFICAR NADA)
            // -----------------------------------------------------------
            const existing = await this.repo.findById(id);
            if (!existing) {
                throw new Error("Input not found"); // normalmente nunca pasa aquí
            }

            previousPhotoPath = existing.photo ?? null;

            // -----------------------------------------------------------
            // 2️⃣ DETECTAR IMAGEN TEMPORAL DESDE BODY
            // -----------------------------------------------------------
            if (body.photo && body.photo.startsWith("inputs/tmp/")) {
                tmpPhotoPath = body.photo;
                delete body.photo; // ⛔ nunca guardar tmp en BD
            }

            // -----------------------------------------------------------
            // 3️⃣ UPDATE DE NEGOCIO (SIN IMAGEN)
            // -----------------------------------------------------------
            const updated: InputProps =
                await this.updateUseCase.execute(id, body);

            // -----------------------------------------------------------
            // 4️⃣ MOVER IMAGEN + UPDATE TÉCNICO DE PHOTO
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                finalPhotoPath =
                    await ImageHandler.moveImageToEntityDirectory(
                        tmpPhotoPath,
                        "Inputs",
                        id
                    );

                await this.repo.update(id, {
                    photo: finalPhotoPath,
                });

                // -------------------------------------------------------
                // 5️⃣ BORRAR IMAGEN ANTERIOR (POST-COMMIT REAL)
                // -------------------------------------------------------
                if (
                    previousPhotoPath &&
                    previousPhotoPath !== finalPhotoPath
                ) {
                    await ImageHandler.removeImageIfExists(previousPhotoPath);
                }
            }

            // -----------------------------------------------------------
            // 6️⃣ RESPUESTA
            // -----------------------------------------------------------
            const formatted: InputResponseDto =
                await this.formatResponse({
                    ...updated,
                    ...(finalPhotoPath ? { photo: finalPhotoPath } : {}),
                });

            return res.status(200).send(formatted);

        } catch (error) {
            // -----------------------------------------------------------
            // 🧹 CLEANUP TMP SI FALLA
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                try {
                    await ImageHandler.removeImageIfExists(tmpPhotoPath);
                } catch {
                    /* best-effort cleanup */
                }
            }
            throw error;
        }
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteinputSchema>, res: ApiResponse<DeleteinputSchema>) => {
        const { id }: DeleteinputSchema["params"] = req.params;
        await this.deleteUseCase.execute(id);
        return res.status(201).send(null);
    };
};