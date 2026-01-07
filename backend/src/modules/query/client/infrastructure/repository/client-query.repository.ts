
import { ProductDiscountClientModel } from "@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";
import { ClientAddressModel } from "@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm";
import { ClientAttributes, ClientModel } from "@modules/core/client/infrastructure/orm/clients.orm";
import { ClientFullQueryResult, ClientSearchCriteria } from "../../domain/client-query.type"
import { ProductModel } from "@modules/core/product/infrastructure/orm/product.orm";
import { IClientQueryRepository } from "../../domain/client-query.repository";
import { ClientOrchestatorAttributes } from "../orm/client-query-types.orm";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Op, Transaction, WhereOptions } from "sequelize";


const mapClientOrchestatorModelToDomain = (model: ClientModel): ClientFullQueryResult => {
    const clientOrchestratorAttributes: ClientOrchestatorAttributes = model.toJSON();
    return {
        ...clientOrchestratorAttributes,
        credit_limit: clientOrchestratorAttributes?.credit_limit
            ? DecimalVO.from(clientOrchestratorAttributes.credit_limit)
            : null,
        created_at: (clientOrchestratorAttributes.created_at instanceof Date)
            ? clientOrchestratorAttributes.created_at
            : new Date(clientOrchestratorAttributes.created_at),
        updated_at: (clientOrchestratorAttributes.updated_at instanceof Date)
            ? clientOrchestratorAttributes.updated_at
            : new Date(clientOrchestratorAttributes.updated_at),
        addresses: clientOrchestratorAttributes.addresses,
        discounts: clientOrchestratorAttributes.discounts.map((dsc) => {
            return {
                ...dsc,
                discount_percentage: DecimalVO.from(dsc.discount_percentage),
                created_at: (dsc.created_at instanceof Date)
                    ? dsc.created_at
                    : new Date(dsc.created_at),
                updated_at: (dsc.updated_at instanceof Date)
                    ? dsc.updated_at
                    : new Date(dsc.updated_at),
                product: {
                    ...dsc.product,
                    created_at: (dsc.product?.created_at instanceof Date)
                        ? dsc.created_at
                        : new Date(dsc.created_at),
                    updated_at: (dsc.product?.updated_at instanceof Date)
                        ? dsc.product?.updated_at
                        : new Date(dsc.product?.updated_at),
                    sale_price: dsc.product.sale_price ? DecimalVO.from(dsc.product.sale_price) : null,
                    production_cost: dsc.product.production_cost ? DecimalVO.from(dsc.product.production_cost) : null,
                }
            }
        })
    };
}

export class ClientQueryRepository implements IClientQueryRepository {

    // ********** SEQUELIZE **********
    getAllClientFullQuery = async (query: ClientSearchCriteria, tx?: Transaction): Promise<ClientFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ClientAttributes> = {
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
        const responses: ClientModel[] = await ClientModel.findAll({
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
        if (!responses.length) return [];
        const results: ClientFullQueryResult[] = responses.map(mapClientOrchestatorModelToDomain);
        return results;
    };

    getByIdClientFullQuery = async (id: number, tx?: Transaction): Promise<ClientFullQueryResult | null> => {
        const response = await ClientModel.findByPk(id, {
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
        if (!response) return null;
        const result: ClientFullQueryResult = mapClientOrchestatorModelToDomain(response);
        return result;
    };
}
