import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import HttpError from "@shared/errors/http/http-error";
import { ClientAddressModel } from "../orm/client-address.model";
import { sequelize } from "@config/mysql/sequelize";
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
    findAll = async (): Promise<ClientAddressProps[]> => {
        const rows: ClientAddressModel[] = await ClientAddressModel.findAll({
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        const rowsMap: ClientAddressProps[] = rows.map((pl) => mapModelToDomain(pl));
        return rowsMap;
    }
    findById = async (id: string): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByClientId = async (client_id: string): Promise<ClientAddressProps | null> => {
        const row: ClientAddressModel | null = await ClientAddressModel.findOne({
            where: { client_id },
            attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ClientAddressCreateProps): Promise<ClientAddressProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: ClientAddressModel = await ClientAddressModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear la nueva dirección del cliente.");
            await transaction.commit();
            return mapModelToDomain(created);
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: string, data: ClientAddressUpdateProps): Promise<ClientAddressProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: ClientAddressModel | null = await ClientAddressModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "La dirección del cliente que se desea actualizar no fue posible encontrarlo."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await ClientAddressModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar la dirección del cliente.");
            // 3. Obtener la locación actualizada
            const updated: ClientAddressModel | null = await ClientAddressModel.findByPk(id, {
                transaction,
                attributes: ClientAddressModel.getAllFields() as ((keyof ClientAddressProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar la dirección del cliente.");
            return mapModelToDomain(updated);
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: string): Promise<void> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const existing: ClientAddressModel | null = await ClientAddressModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro la dirección del cliente que se pretende eliminar."
            );
            const deleted: number = await ClientAddressModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar el cliente.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

