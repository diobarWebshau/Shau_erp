import { IInputRepository } from "../../domain/input.repository.interface";
import { InputProps, InputUpdateProps } from "../../domain/input.types";
import { diffObjects } from "@helpers/validation-diff-engine-backend";
import { pickEditableFields } from "@helpers/pickEditableFields";
import { deepNormalizeDecimals } from "@helpers/decimal-normalization-and-cleaning.utils";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

export class UpdateInputUseCase {
    constructor(private readonly repo: IInputRepository) { }

    async execute(id: number, data: InputUpdateProps, tx?: Transaction): Promise<InputProps> {

        // -----------------------------------------------------------
        // 1️⃣ OBTENER ESTADO ACTUAL
        // -----------------------------------------------------------
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new HttpError(404, "Input not found.");
        }

        // -----------------------------------------------------------
        // 2️⃣ FILTRAR CAMPOS EDITABLES
        // -----------------------------------------------------------
        const editableFields: (keyof InputUpdateProps)[] = [
            "custom_id", "name", "description", "sku", "presentation",
            "unit_of_measure", "storage_conditions", "barcode", "input_types_id",
            "unit_cost", "supplier", "is_draft", "status", "photo"
        ];

        const filtered: InputUpdateProps = pickEditableFields(data, editableFields);

        // -----------------------------------------------------------
        // 3️⃣ MERGE VIRTUAL DEL ESTADO
        // -----------------------------------------------------------
        const merged: InputProps = { ...existing, ...filtered };

        // Normalización de decimales
        const normalizedExisting: InputUpdateProps = deepNormalizeDecimals<InputUpdateProps>(existing, ["unit_cost", "barcode"]);
        const normalizedMerged: InputUpdateProps = deepNormalizeDecimals<InputUpdateProps>(merged, ["unit_cost", "barcode"]);

        // -----------------------------------------------------------
        // 4️⃣ DETECTAR CAMBIOS EFECTIVOS
        // -----------------------------------------------------------
        const diff = await diffObjects(normalizedExisting, normalizedMerged);

        if (!Object.keys(diff).length) {
            return existing; // No hay cambios reales
        }

        // -----------------------------------------------------------
        // 5️⃣ VALIDACIONES DE UNICIDAD (solo si se envió en data)
        // -----------------------------------------------------------
        if (data.name) {
            const found = await this.repo.findByName(data.name);
            if (found && found.id !== id) {
                throw new HttpError(409, "The input name is already in use.");
            }
        }

        if (data.sku) {
            const found = await this.repo.findBySku(data.sku);
            if (found && found.id !== id) {
                throw new HttpError(409, "The SKU is already in use.");
            }
        }

        if (data.custom_id) {
            const found = await this.repo.findByCustomId(data.custom_id);
            if (found && found.id !== id) {
                throw new HttpError(409, "The custom_id is already in use.");
            }
        }

        if (data.barcode) {
            const found = await this.repo.findByBarcode(String(data.barcode));
            if (found && found.id !== id) {
                throw new HttpError(409, "The barcode is already in use.");
            }
        }

        // -----------------------------------------------------------
        // 6️⃣ UPDATE EN BD
        // -----------------------------------------------------------
        const updated = await this.repo.update(id, diff, tx);
        if (!updated) {
            throw new HttpError(500, "Failed to update input.");
        }

        // -----------------------------------------------------------
        // 7️⃣ RETURN FINAL
        // -----------------------------------------------------------
        return updated;
    }
}
