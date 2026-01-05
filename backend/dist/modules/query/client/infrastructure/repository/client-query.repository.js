"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryRepository = void 0;
const product_discount_client_orm_1 = require("@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm");
const client_address_orm_1 = require("@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm");
const product_orm_1 = require("@modules/core/product/infrastructure/orm/product.orm");
const clients_orm_1 = require("@modules/core/client/infrastructure/orm/clients.orm");
const sequelize_1 = require("sequelize");
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
        const results = await clients_orm_1.ClientModel.findAll({
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
        if (!results.length)
            return [];
        const Clients = results.map(p => p.toJSON());
        return Clients;
    };
    getByIdClientFullQuery = async (id, tx) => {
        const result = await clients_orm_1.ClientModel.findByPk(id, {
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
        if (!result)
            return null;
        const Client = result.toJSON();
        return Client;
    };
}
exports.ClientQueryRepository = ClientQueryRepository;
