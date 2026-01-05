
import { ProductDiscountClientModel } from "@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";
import { ClientAddressModel } from "@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm";
import { ClientFullQueryResult, ClientSearchCriteria } from "../../domain/client-query.type"
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";
import { ClientModel } from "@modules/core/client/infrastructure/orm/clients.orm";
import { IClientQueryRepository } from "../../domain/client-query.repository";
import { ClientProps } from "@modules/core/client/domain/client.types";
import { Op, Transaction, WhereOptions } from "sequelize";

export class ClientQueryRepository implements IClientQueryRepository {

    // ********** SEQUELIZE **********
    getAllClientFullQuery = async (query: ClientSearchCriteria, tx?: Transaction): Promise<ClientFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ClientProps> = {
            ...(
                exclude_ids?.length
                    ? { id: { [Op.notIn]: exclude_ids } }
                    : {}
            ),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(
                Object.entries(rest)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [
                        k,
                        Array.isArray(v) ? { [Op.notIn]: v } : v,
                    ])
            ),
            ...(
                filter
                    ? {
                        [Op.or]: [
                            { company_name: { [Op.like]: `%${filter}%` } },
                            { email: { [Op.like]: `%${filter}%` } },
                            { tax_id: { [Op.like]: `%${filter}%` } },
                            { cfdi: { [Op.like]: `%${filter}%` } },
                        ],
                    }
                    : {}
            ),
        };
        const results: ClientModel[] = await ClientModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: ClientAddressModel, as: "addresses" },
                {
                    model: ProductDiscountClientModel,
                    as: "discounts",
                    include: [{
                        model: ProductModel,
                        as: "product"
                    }]
                },
            ]
        });
        if (!results.length) return [];
        const Clients: ClientFullQueryResult[] = results.map(p => p.toJSON());
        return Clients;
    };

    getByIdClientFullQuery = async (id: number, tx?: Transaction): Promise<ClientFullQueryResult | null> => {
        const result = await ClientModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: ClientAddressModel, as: "addresses" },
                {
                    model: ProductDiscountClientModel,
                    as: "discounts",
                    include: [{
                        model: ProductModel,
                        as: "product"
                    }]
                },
            ]
        });
        if (!result) return null;
        const Client: ClientFullQueryResult = result.toJSON();
        return Client;
    };
}
