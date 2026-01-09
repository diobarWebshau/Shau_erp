"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryRepository = void 0;
const product_discount_range_orm_1 = require("@modules/features/products/assigments/product-discounts-ranges/infrastructure/orm/product-discount-range.orm");
const product_process_orm_1 = require("@modules/features/products/assigments/product-process/infrastructure/orm/product-process.orm");
const product_inputs_orm_1 = require("@modules/features/products/assigments/product-input/infrastructure/orm/product-inputs.orm");
const product_input_process_orm_1 = require("@src/modules/features/products/assigments/product-input-process/infrastructure/orm/product-input-process.orm");
const product_orm_1 = require("@modules/core/product/infrastructure/orm/product.orm");
const process_orm_1 = require("@src/modules/core/process/infrastructure/orm/process.orm");
const input_orm_1 = require("@src/modules/core/input/infrastructure/orm/input.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const sequelize_1 = require("sequelize");
const mapProductQueryModelToDomain = (model) => {
    const productQueryAttributes = model.toJSON();
    const { product_discount_ranges, product_processes, product_inputs, ...productRest } = productQueryAttributes;
    return {
        ...productRest,
        sale_price: productRest.sale_price ? decimal_vo_1.DecimalVO.from(productRest.sale_price) : null,
        production_cost: productRest.production_cost ? decimal_vo_1.DecimalVO.from(productRest.production_cost) : null,
        created_at: (productRest.created_at instanceof Date) ? productRest.created_at : new Date(productRest.created_at),
        updated_at: (productRest.updated_at instanceof Date) ? productRest.updated_at : new Date(productRest.updated_at),
        product_discount_ranges: product_discount_ranges.map((pdr) => ({
            ...pdr,
            max_qty: decimal_vo_1.DecimalVO.from(pdr.max_qty),
            min_qty: decimal_vo_1.DecimalVO.from(pdr.min_qty),
            unit_price: decimal_vo_1.DecimalVO.from(pdr.unit_price),
            created_at: (pdr.created_at instanceof Date) ? pdr.created_at : new Date(pdr.created_at),
            updated_at: (pdr.updated_at instanceof Date) ? pdr.updated_at : new Date(pdr.updated_at),
            product: {
                ...pdr.product,
                production_cost: pdr.product.production_cost ? decimal_vo_1.DecimalVO.from(pdr.product.production_cost) : null,
                sale_price: pdr.product.sale_price ? decimal_vo_1.DecimalVO.from(pdr.product.sale_price) : null,
                created_at: (pdr.product.created_at instanceof Date) ? pdr.product.created_at : new Date(pdr.product.created_at),
                updated_at: (pdr.product.updated_at instanceof Date) ? pdr.product.updated_at : new Date(pdr.product.updated_at),
            }
        })),
        product_processes: product_processes.map((pp) => ({
            ...pp,
            process: {
                ...pp.process,
                created_at: (pp.process.created_at instanceof Date) ? pp.process.created_at : new Date(pp.process.created_at),
                updated_at: (pp.process.updated_at instanceof Date) ? pp.process.updated_at : new Date(pp.process.updated_at),
            },
            product: {
                ...pp.product,
                production_cost: pp.product.production_cost ? decimal_vo_1.DecimalVO.from(pp.product.production_cost) : null,
                sale_price: pp.product.sale_price ? decimal_vo_1.DecimalVO.from(pp.product.sale_price) : null,
                created_at: (pp.product.created_at instanceof Date) ? pp.product.created_at : new Date(pp.product.created_at),
                updated_at: (pp.product.updated_at instanceof Date) ? pp.product.updated_at : new Date(pp.product.updated_at),
            },
            product_input_process: pp.product_input_process.map((pip) => ({
                ...pip,
                qty: decimal_vo_1.DecimalVO.from(pip.qty),
                product_input: {
                    ...pip.product_input,
                    equivalence: decimal_vo_1.DecimalVO.from(pip.product_input.equivalence)
                },
                product: {
                    ...pip.product,
                    production_cost: pip.product.production_cost ? decimal_vo_1.DecimalVO.from(pip.product.production_cost) : null,
                    sale_price: pip.product.sale_price ? decimal_vo_1.DecimalVO.from(pip.product.sale_price) : null,
                    created_at: (pip.product.created_at instanceof Date) ? pip.product.created_at : new Date(pip.product.created_at),
                    updated_at: (pip.product.updated_at instanceof Date) ? pip.product.updated_at : new Date(pip.product.updated_at),
                },
                product_process: {
                    ...pip.product_process,
                }
            }))
        })),
        product_inputs: product_inputs.map((pi) => ({
            ...pi,
            equivalence: decimal_vo_1.DecimalVO.from(pi.equivalence),
            input: {
                ...pi.input,
                created_at: (pi.input.created_at instanceof Date) ? pi.input.created_at : new Date(pi.input.created_at),
                updated_at: (pi.input.updated_at instanceof Date) ? pi.input.updated_at : new Date(pi.input.updated_at),
                unit_cost: pi.input.unit_cost ? decimal_vo_1.DecimalVO.from(pi.input.unit_cost) : null
            },
            product: {
                ...pi.product,
                production_cost: pi.product.production_cost ? decimal_vo_1.DecimalVO.from(pi.product.production_cost) : null,
                sale_price: pi.product.sale_price ? decimal_vo_1.DecimalVO.from(pi.product.sale_price) : null,
                created_at: (pi.product.created_at instanceof Date) ? pi.product.created_at : new Date(pi.product.created_at),
                updated_at: (pi.product.updated_at instanceof Date) ? pi.product.updated_at : new Date(pi.product.updated_at),
            },
        }))
    };
};
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
                        { name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { custom_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { barcode: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { description: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { presentation: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { sku: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const results = await product_orm_1.ProductModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: product_inputs_orm_1.ProductInputModel,
                    as: "product_inputs",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" },
                        { model: input_orm_1.InputModel, as: "input" }
                    ]
                },
                {
                    model: product_process_orm_1.ProductProcessModel,
                    as: "product_processes",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" },
                        { model: process_orm_1.ProcessModel, as: "process" },
                        {
                            model: product_input_process_orm_1.ProductInputProcessModel,
                            as: "product_input_process",
                            include: [
                                { model: product_orm_1.ProductModel, as: "product" },
                                {
                                    model: product_inputs_orm_1.ProductInputModel,
                                    as: "product_input",
                                    include: [
                                        { model: input_orm_1.InputModel, as: "input" },
                                    ]
                                },
                                { model: product_process_orm_1.ProductProcessModel, as: "product_process" },
                            ]
                        }
                    ]
                },
                {
                    model: product_discount_range_orm_1.ProductDiscountRangeModel,
                    as: "product_discount_ranges",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" }
                    ]
                },
            ]
        });
        if (!results.length)
            return [];
        const products = results.map(mapProductQueryModelToDomain);
        return products;
    };
    getByIdProductFullQueryResult = async (id, tx) => {
        const result = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: product_inputs_orm_1.ProductInputModel,
                    as: "product_inputs",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" },
                        { model: input_orm_1.InputModel, as: "input" }
                    ]
                },
                {
                    model: product_process_orm_1.ProductProcessModel,
                    as: "product_processes",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" },
                        { model: process_orm_1.ProcessModel, as: "process" },
                        {
                            model: product_input_process_orm_1.ProductInputProcessModel,
                            as: "product_input_process",
                            include: [
                                { model: product_orm_1.ProductModel, as: "product" },
                                {
                                    model: product_inputs_orm_1.ProductInputModel,
                                    as: "product_input",
                                    include: [
                                        { model: input_orm_1.InputModel, as: "input" },
                                        { model: product_orm_1.ProductModel, as: "product" },
                                    ]
                                },
                                { model: product_process_orm_1.ProductProcessModel, as: "product_process" },
                            ]
                        }
                    ]
                },
                {
                    model: product_discount_range_orm_1.ProductDiscountRangeModel,
                    as: "product_discount_ranges",
                    include: [
                        { model: product_orm_1.ProductModel, as: "product" }
                    ]
                },
            ]
        });
        if (!result)
            return null;
        const product = mapProductQueryModelToDomain(result);
        return product;
    };
}
exports.ProductQueryRepository = ProductQueryRepository;
