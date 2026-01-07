"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientOrchestratorUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
const mapClientOrchestratorUpdateDtoToDomain = (data) => {
    const { addresses_manager, discounts_manager, client } = data;
    const { credit_limit, ...rest_client } = client;
    return {
        client: {
            ...rest_client,
            ...(credit_limit !== undefined
                ? { credit_limit: credit_limit === null ? null : decimal_vo_1.DecimalVO.from(credit_limit) }
                : {}),
        },
        addresses_manager: addresses_manager,
        discounts_manager: {
            added: discounts_manager.added.map((add) => {
                return {
                    ...add,
                    discount_percentage: decimal_vo_1.DecimalVO.from(add.discount_percentage)
                };
            }),
            updated: discounts_manager.updated.map((upt) => {
                const { discount_percentage, ...rest } = upt;
                return {
                    ...rest,
                    ...(discount_percentage !== undefined
                        ? { discount_percentage: decimal_vo_1.DecimalVO.from(discount_percentage) }
                        : {}),
                };
            }),
            deleted: discounts_manager.deleted
        }
    };
};
class UpdateClientOrchestratorUseCase {
    productDiscountClientRepo;
    clientAddressRepo;
    clientRepo;
    clientQueryRepo;
    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }) {
        this.productDiscountClientRepo = productDiscountClientRepo;
        this.clientRepo = clientRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientQueryRepo = clientQueryRepo;
    }
    ;
    execute = async (id, data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const updateData = mapClientOrchestratorUpdateDtoToDomain(data);
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { client, addresses_manager, discounts_manager } = updateData;
            // --------------------------------------------------
            // |🔹 CLIENT                                       |
            // --------------------------------------------------
            const clientUpdateResponse = await this.clientRepo.update(id, client, tx);
            // --------------------------------------------------
            // |🔹 MANAGERS                                     |
            // --------------------------------------------------
            const isChangeAddressManager = (addresses_manager?.added ?? []).length > 0 ||
                (addresses_manager?.updated ?? []).length > 0 ||
                (addresses_manager?.deleted ?? []).length > 0;
            const isChangeDiscountManager = (discounts_manager?.added ?? []).length > 0 ||
                (discounts_manager?.updated ?? []).length > 0 ||
                (discounts_manager?.deleted ?? []).length > 0;
            // --------------------------------------------------
            // |🔹 CLIENT-ADDRESS                               |
            // --------------------------------------------------
            if (isChangeAddressManager) {
                const added = addresses_manager?.added ?? [];
                const deleted = addresses_manager?.deleted ?? [];
                const updated = addresses_manager?.updated ?? [];
                if (added.length) {
                    for (const addr of added) {
                        const newAddress = {
                            ...addr,
                            client_id: clientUpdateResponse.id
                        };
                        await this.clientAddressRepo.create(newAddress, tx);
                    }
                }
                if (deleted.length) {
                    for (const addr of deleted) {
                        const { id } = addr;
                        await this.clientAddressRepo.delete(id, tx);
                    }
                }
                if (updated.length) {
                    for (const addr of updated) {
                        const { id, ...rest } = addr;
                        await this.clientAddressRepo.update(id, rest, tx);
                    }
                }
            }
            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-CLIENT                      |
            // --------------------------------------------------
            if (isChangeDiscountManager) {
                const added = discounts_manager?.added ?? [];
                const deleted = discounts_manager?.deleted ?? [];
                const updated = discounts_manager?.updated ?? [];
                if (added.length) {
                    for (const disc of added) {
                        const newDiscount = {
                            ...disc,
                            client_id: clientUpdateResponse.id
                        };
                        await this.productDiscountClientRepo.create(newDiscount, tx);
                    }
                }
                if (deleted.length) {
                    for (const disc of deleted) {
                        const { id } = disc;
                        await this.productDiscountClientRepo.delete(id, tx);
                    }
                }
                if (updated.length) {
                    for (const disc of updated) {
                        const { id, ...rest } = disc;
                        await this.productDiscountClientRepo.update(id, rest, tx);
                    }
                }
            }
            const clientQueryResponse = await this.clientQueryRepo.getByIdClientFullQuery(clientUpdateResponse.id, tx);
            if (!clientQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder el cliente despues de haber sido creado.");
            const { addresses: addresses_query, discounts: discounts_query, ...client_query } = clientQueryResponse;
            const clientFullResult = {
                client: client_query,
                addresses: addresses_query,
                discounts: discounts_query
            };
            await tx.commit();
            return clientFullResult;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.UpdateClientOrchestratorUseCase = UpdateClientOrchestratorUseCase;
