import { IInputRepository } from "../../domain/input.repository.interface";
import { InputCreateProps, InputProps } from "../../domain/input.types";
import HttpError from "@shared/errors/http/http-error";

export class CreateInputUseCase {
    constructor(private readonly repo: IInputRepository) {}

    async execute(data: InputCreateProps): Promise<InputProps> {
        // -----------------------------------------------------------
        // 1️⃣ VALIDACIONES DE NEGOCIO
        // -----------------------------------------------------------
        if (!data.name || data.name.trim().length < 3) {
            throw new HttpError(400, "Input name must have at least 3 characters.");
        }

        // -----------------------------------------------------------
        // 2️⃣ VALIDACIONES DE UNICIDAD
        // -----------------------------------------------------------
        if (data.name) {
            const exists = await this.repo.findByName(data.name);
            if (exists) {
                throw new HttpError(409, "An input with this name already exists.");
            }
        }

        if (data.sku) {
            const exists = await this.repo.findBySku(data.sku);
            if (exists) {
                throw new HttpError(409, "An input with this SKU already exists.");
            }
        }

        if (data.custom_id) {
            const exists = await this.repo.findByCustomId(data.custom_id);
            if (exists) {
                throw new HttpError(409, "An input with this custom_id already exists.");
            }
        }

        // -----------------------------------------------------------
        // 3️⃣ CREAR REGISTRO
        // -----------------------------------------------------------
        const created = await this.repo.create(data);

        if (!created) {
            throw new HttpError(500, "Failed to create input.");
        }

        return created;
    }
}
