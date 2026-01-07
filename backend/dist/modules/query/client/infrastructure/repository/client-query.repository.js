"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryRepository = void 0;
const product_discount_client_orm_1 = require("@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm");
const client_address_orm_1 = require("@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm");
const clients_orm_1 = require("@modules/core/client/infrastructure/orm/clients.orm");
const product_orm_1 = require("@modules/core/product/infrastructure/orm/product.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const sequelize_1 = require("sequelize");
const mapClientOrchestatorModelToDomain = (model) => {
    const clientOrchestratorAttributes = model.toJSON();
    return {
        ...clientOrchestratorAttributes,
        credit_limit: clientOrchestratorAttributes?.credit_limit
            ? decimal_vo_1.DecimalVO.from(clientOrchestratorAttributes.credit_limit)
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
                discount_percentage: decimal_vo_1.DecimalVO.from(dsc.discount_percentage),
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
                    sale_price: dsc.product.sale_price ? decimal_vo_1.DecimalVO.from(dsc.product.sale_price) : null,
                    production_cost: dsc.product.production_cost ? decimal_vo_1.DecimalVO.from(dsc.product.production_cost) : null,
                }
            };
        })
    };
};
class ClientQueryRepository {
    // ********** SEQUELIZE **********
    getAllClientFullQuery = async (query, tx) => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(Object.entries(rest)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [
                k,
                Array.isArray(v) ? { [sequelize_1.Op.notIn]: v } : v,
            ])),
            ...(filter
                ? {
                    [sequelize_1.Op.or]: [
                        { company_name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { email: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { tax_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { cfdi: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const responses = await clients_orm_1.ClientModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: client_address_orm_1.ClientAddressModel, as: "addresses" },
                {
                    model: product_discount_client_orm_1.ProductDiscountClientModel,
                    as: "discounts",
                    include: [{
                            model: product_orm_1.ProductModel,
                            as: "product"
                        }]
                },
            ]
        });
        if (!responses.length)
            return [];
        const results = responses.map(mapClientOrchestatorModelToDomain);
        return results;
    };
    getByIdClientFullQuery = async (id, tx) => {
        const response = await clients_orm_1.ClientModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: client_address_orm_1.ClientAddressModel, as: "addresses" },
                {
                    model: product_discount_client_orm_1.ProductDiscountClientModel,
                    as: "discounts",
                    include: [{
                            model: product_orm_1.ProductModel,
                            as: "product"
                        }]
                },
            ]
        });
        if (!response)
            return null;
        const result = mapClientOrchestatorModelToDomain(response);
        return result;
    };
}
exports.ClientQueryRepository = ClientQueryRepository;
