"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryRepository = void 0;
const product_discount_range_orm_1 = require("@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm");
const product_process_orm_1 = require("@modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm");
const product_inputs_orm_1 = require("@modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm");
const product_orm_1 = require("@modules/core/product/infrastructure/orm/product.orm");
const sequelize_1 = require("sequelize");
class ProductQueryRepository {
    // ********** SEQUELIZE **********
    getAllProductFullQueryResult = async (query, tx) => {
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
        const results = await product_orm_1.ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: product_inputs_orm_1.ProductInputModel, as: "products_inputs" },
                { model: product_process_orm_1.ProductProcessModel, as: "product_processes" },
                { model: product_discount_range_orm_1.ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!results.length)
            return [];
        const products = results.map(p => p.toJSON());
        return products;
    };
    getByIdProductFullQueryResult = async (id, tx) => {
        const result = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: product_inputs_orm_1.ProductInputModel, as: "products_inputs" },
                { model: product_process_orm_1.ProductProcessModel, as: "product_processes" },
                { model: product_discount_range_orm_1.ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!result)
            return null;
        const product = result.toJSON();
        return product;
    };
    // ********** ORCHESTRATOR **********
    getAllProductOrchestratorResult = async (query, tx) => {
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
        const results = await product_orm_1.ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                { model: product_inputs_orm_1.ProductInputModel, as: "products_inputs" },
                { model: product_process_orm_1.ProductProcessModel, as: "product_processes" },
                { model: product_discount_range_orm_1.ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!results.length)
            return [];
        const products = results.map(p => p.toJSON());
        return products;
    };
    getByIdProductOrchestratorResult = async (id, tx) => {
        const result = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                { model: product_inputs_orm_1.ProductInputModel, as: "products_inputs" },
                { model: product_process_orm_1.ProductProcessModel, as: "product_processes" },
                { model: product_discount_range_orm_1.ProductDiscountRangeModel, as: "product_discount_ranges" },
            ]
        });
        if (!result)
            return null;
        const product = result.toJSON();
        return product;
    };
}
exports.ProductQueryRepository = ProductQueryRepository;
