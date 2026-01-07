import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import { ClientAddressAttributes, ClientAddressModel } from "../orm/client-address.orm";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapClientAddressModelToDomain = (model: ClientAddressModel): ClientAddressProps => {
    const json: ClientAddressAttributes = model.toJSON();
    return {
        ...json,
        updated_at: (json.updated_at instanceof Date) ? json.updated_at : new Date(json.updated_at),
        created_at: (json.created_at instanceof Date) ? json.created_at : new Date(json.created_at)
    };
};

export class ClientAddressRepository implements IClientAddressRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx?: Transaction): Promise<ClientAddressProps[]> => {
        const rows: ClientAddressModel[] = await ClientAddressModel.findAll({
            transaction: tx
        });
        const rowsMap: ClientAddressProps[] = rows.map((pl) => mapClientAddressModelToDomain(pl));
        return rowsMap;
    }
    findById = async (id: number, tx?: Transaction): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        return row ? mapClientAddressModelToDomain(row) : null;
    }
    findByClientId = async (client_id: string, tx?: Transaction): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findOne({
            transaction: tx,
            where: { client_id }
        });
        return row ? mapClientAddressModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ClientAddressCreateProps, tx?: Transaction): Promise<ClientAddressProps> => {
        const created: ClientAddressModel = await ClientAddressModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la nueva dirección del cliente.");
        return mapClientAddressModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ClientAddressUpdateProps, tx?: Transaction): Promise<ClientAddressProps> => {
        // 1. Verificar existencia
        const existing: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La dirección del cliente que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapClientAddressModelToDomain(existing);
        if (!Object.keys(data).length) return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ClientAddressModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existing;
        // 3. Obtener la locación actualizada
        const updated: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la dirección del cliente.");
        return mapClientAddressModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la dirección del cliente que se pretende eliminar."
        );
        const deleted: number = await ClientAddressModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el cliente.");
        return;
    }
}

