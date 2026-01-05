"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientOrchestratorUseCase = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("@src/helpers/imageHandlerClass"));
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
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { client, addresses_manager, discounts_manager } = data;
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
                    for (const disc of deleted) {
                        const { id, ...rest } = disc;
                        await this.productDiscountClientRepo.update(id, rest, tx);
                    }
                }
            }
            const clientQueryResponse = await this.clientQueryRepo.getByIdClientFullQuery(clientUpdateResponse.id, tx);
            if (!clientQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder el cliente despues de haber sido actualizadp.");
            const { addresses: addrs, discounts: discs, ...clt } = clientQueryResponse;
            const dataClient = {
                ...clt,
                created_at: clt.created_at.toISOString(),
                updated_at: clt.updated_at.toISOString(),
            };
            const dataDiscounts = discs.length ? await Promise.all(discs.map(async (disc) => ({
                ...disc,
                created_at: disc.created_at.toISOString(),
                updated_at: disc.updated_at.toISOString(),
                product: {
                    ...disc.product,
                    created_at: disc.product.created_at.toISOString(),
                    updated_at: disc.product.updated_at.toISOString(),
                    photo: disc.product.photo ? await imageHandlerClass_1.default.convertToBase64(disc.product.photo) : null
                }
            }))) : [];
            const dataAddresses = addrs.length ? await Promise.all(addrs.map(async (addr) => ({
                ...addr,
                created_at: addr.created_at.toISOString(),
                updated_at: addr.updated_at.toISOString(),
            }))) : [];
            const clientFullResult = {
                client: dataClient,
                addresses: dataAddresses,
                discounts: dataDiscounts
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
