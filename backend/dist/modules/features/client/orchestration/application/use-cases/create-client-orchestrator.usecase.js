"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientOrchestratorUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class CreateClientOrchestratorUseCase {
    productDiscountClientRepo;
    clientAddressRepo;
    clientRepo;
    clientQueryRepo;
    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }) {
        this.productDiscountClientRepo = productDiscountClientRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientRepo = clientRepo;
        this.clientQueryRepo = clientQueryRepo;
    }
    ;
    execute = async (data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { client, addresses, discounts } = data;
            const clientCreateResponse = await this.clientRepo.create(client, tx);
            if (addresses && addresses.length) {
                for (const addr of addresses) {
                    const newAddress = {
                        ...addr,
                        client_id: clientCreateResponse.id
                    };
                    await this.clientAddressRepo.create(newAddress, tx);
                }
                ;
            }
            if (discounts && discounts.length) {
                for (const disc of discounts) {
                    const newDIscount = {
                        ...disc,
                        client_id: clientCreateResponse.id
                    };
                    await this.productDiscountClientRepo.create(newDIscount, tx);
                }
                ;
            }
            const clientQueryResponse = await this.clientQueryRepo.getByIdClientFullQuery(clientCreateResponse.id, tx);
            if (!clientQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder el cliente despues de haber sido creado.");
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
        ;
    };
}
exports.CreateClientOrchestratorUseCase = CreateClientOrchestratorUseCase;
