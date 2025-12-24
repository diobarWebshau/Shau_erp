import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import HttpError from "@shared/errors/http/http-error";
import { ClientAddressModel } from "../orm/client-address.orm";
import { Transaction } from "sequelize";

const mapModelToDomain = (model: ClientAddressModel): ClientAddressProps => {
    const json: ClientAddressProps = model.toJSON();
    return {
        id: json.id,
        city: json.city,
        country: json.country,
        created_at: json.created_at,
        neighborhood: json.neighborhood,
        state: json.state,
        street: json.street,
        street_number: json.street_number,
        updated_at: json.updated_at,
        zip_code: json.zip_code,
        client_id: json.client_id
    };
}

export class ClientAddressRepository implements IClientAddressRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx?: Transaction): Promise<ClientAddressProps[]> => {
        const rows: ClientAddressModel[] = await ClientAddressModel.findAll({
            transaction: tx,
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        const rowsMap: ClientAddressProps[] = rows.map((pl) => mapModelToDomain(pl));
        return rowsMap;
    }
    findById = async (id: number, tx?: Transaction): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx,
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByClientId = async (client_id: string, tx?: Transaction): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findOne({
            transaction: tx,
            where: { client_id },
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ClientAddressCreateProps, tx?: Transaction): Promise<ClientAddressProps> => {
        const created: ClientAddressModel = await ClientAddressModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la nueva dirección del cliente.");
        return mapModelToDomain(created);
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
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ClientAddressModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la dirección del cliente.");
        // 3. Obtener la locación actualizada
        const updated: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            transaction: tx,
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la dirección del cliente.");
        return mapModelToDomain(updated);
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

