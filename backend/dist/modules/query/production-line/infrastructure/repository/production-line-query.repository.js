"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineQueryRepository = void 0;
const production_line_product_orm_1 = require("@modules/features/production-line/assigments/production-line-product/infrastructure/orm/production-line-product.orm");
const production_lines_orm_1 = require("@modules/core/production-line/infrastructure/orm/production-lines.orm");
const product_orm_1 = require("@modules/core/product/infrastructure/orm/product.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const sequelize_1 = require("sequelize");
const mapProductionLineQueryModelToDomain = (model) => {
    const productionlineQueryAttributes = model.toJSON();
    const { production_line_products: plp, ...pl } = productionlineQueryAttributes;
    return ({
        ...pl,
        created_at: pl.created_at instanceof Date ? pl.created_at : new Date(pl.created_at),
        updated_at: pl.updated_at instanceof Date ? pl.updated_at : new Date(pl.updated_at),
        production_line_products: plp.map((plp) => ({
            ...plp,
            product: {
                ...plp.product,
                created_at: plp.product.created_at instanceof Date ? plp.product.created_at : new Date(plp.product.created_at),
                updated_at: plp.product.updated_at instanceof Date ? plp.product.updated_at : new Date(plp.product.updated_at),
                sale_price: plp.product.sale_price ? decimal_vo_1.DecimalVO.from(plp.product.sale_price) : null,
                production_cost: plp.product.production_cost ? decimal_vo_1.DecimalVO.from(plp.product.production_cost) : null
            }
        }))
    });
};
class ProductionLineQueryRepository {
    // ********** SEQUELIZE **********
    getAllProductionLineFullQuery = async (query, tx) => {
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
                    ],
                }
                : {}),
        };
        const results = await production_lines_orm_1.ProductionLineModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: production_line_product_orm_1.ProductionLineProductModel,
                    as: "production_line_products",
                    include: [{
                            model: product_orm_1.ProductModel,
                            as: "product"
                        }]
                },
            ]
        });
        if (!results.length)
            return [];
        const ProductionLines = results.map(mapProductionLineQueryModelToDomain);
        return ProductionLines;
    };
    getByIdProductionLineFullQuery = async (id, tx) => {
        const result = await production_lines_orm_1.ProductionLineModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: production_line_product_orm_1.ProductionLineProductModel,
                    as: "production_line_products",
                    include: [{
                            model: product_orm_1.ProductModel,
                            as: "product"
                        }, {
                            model: production_lines_orm_1.ProductionLineModel,
                            as: "production_line"
                        }]
                },
            ]
        });
        if (!result)
            return null;
        const ProductionLine = mapProductionLineQueryModelToDomain(result);
        return ProductionLine;
    };
}
exports.ProductionLineQueryRepository = ProductionLineQueryRepository;
