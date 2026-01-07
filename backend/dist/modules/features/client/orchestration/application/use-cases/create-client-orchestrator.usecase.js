"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientOrchestratorUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const sequelize_2 = require("@config/mysql/sequelize");
;
const mapClientOrchestratorCreateDtoToDomain = (data) => ({
    client: {
        ...data.client,
        credit_limit: data.client.credit_limit
            ? decimal_vo_1.DecimalVO.from(data.client.credit_limit)
            : null,
    },
    addresses: data.addresses,
    discounts: data.discounts.map((dsc) => ({
        ...dsc,
        discount_percentage: decimal_vo_1.DecimalVO.from(dsc.discount_percentage)
    })),
});
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
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const createData = mapClientOrchestratorCreateDtoToDomain(data);
            const { client, addresses, discounts } = createData;
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
            ;
            const clientQueryResponse = await this.clientQueryRepo.getByIdClientFullQuery(clientCreateResponse.id, tx);
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
        ;
    };
}
exports.CreateClientOrchestratorUseCase = CreateClientOrchestratorUseCase;
