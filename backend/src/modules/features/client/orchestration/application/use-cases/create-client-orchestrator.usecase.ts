import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ProductDiscountClientCreateProps } from "../../../assigments/product-discount-client/domain/product-discount-client.types";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { ClientAddressCreateProps } from "../../../assigments/client-addresses/domain/client-address.types";
import { ClientCreateOrchestrator, ClientOrchestrator } from "../../domain/client-orchestrator.types";
import { IClientQueryRepository } from "@modules/query/client/domain/client-query.repository";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientFullQueryResult } from "@modules/query/client/domain/client-query.type";
import { ClientOrchestratorCreateDto } from "../dto/client-orchestrator.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { ClientProps } from "@modules/core/client/domain/client.types";
import { Transaction as SequelizeTx } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { sequelize } from "@config/mysql/sequelize";
import type { Transaction } from "sequelize";

interface ICreateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository,
    clientRepo: IClientRepository,
    clientAddressRepo: IClientAddressRepository,
    clientQueryRepo: IClientQueryRepository
};

const mapClientOrchestratorCreateDtoToDomain = (data: ClientOrchestratorCreateDto): ClientCreateOrchestrator => ({
    client: {
        ...data.client,
        credit_limit: data.client.credit_limit
            ? DecimalVO.from(data.client.credit_limit)
            : null,
    },
    addresses: data.addresses,
    discounts: data.discounts.map((dsc) => ({
        ...dsc,
        discount_percentage: DecimalVO.from(dsc.discount_percentage)
    })),
});


export class CreateClientOrchestratorUseCase {

    private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    private readonly clientAddressRepo: IClientAddressRepository;
    private readonly clientRepo: IClientRepository;
    private readonly clientQueryRepo: IClientQueryRepository;

    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }: ICreateClientOrchestratorUseCase) {
        this.productDiscountClientRepo = productDiscountClientRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientRepo = clientRepo;
        this.clientQueryRepo = clientQueryRepo;
    };

    execute = async (data: ClientOrchestratorCreateDto): Promise<ClientOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {

            const createData = mapClientOrchestratorCreateDtoToDomain(data);

            const { client, addresses, discounts }: ClientCreateOrchestrator = createData;
            const clientCreateResponse: ClientProps = await this.clientRepo.create(client, tx);
            if (addresses && addresses.length) {
                for (const addr of addresses) {
                    const newAddress: ClientAddressCreateProps = {
                        ...addr,
                        client_id: clientCreateResponse.id
                    };
                    await this.clientAddressRepo.create(newAddress, tx);
                };
            }
            if (discounts && discounts.length) {
                for (const disc of discounts) {
                    const newDIscount: ProductDiscountClientCreateProps = {
                        ...disc,
                        client_id: clientCreateResponse.id
                    };
                    await this.productDiscountClientRepo.create(newDIscount, tx);
                };
            };

            const clientQueryResponse: ClientFullQueryResult | null = await this.clientQueryRepo.getByIdClientFullQuery(clientCreateResponse.id, tx);

            if (!clientQueryResponse) throw new HttpError(500, "No se pudo acceder el cliente despues de haber sido creado.");

            const { addresses: addresses_query, discounts: discounts_query, ...client_query }: ClientFullQueryResult = clientQueryResponse;

            const clientFullResult: ClientOrchestrator = {
                client: client_query,
                addresses: addresses_query,
                discounts: discounts_query
            };

            await tx.commit();
            return clientFullResult;
        
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        };
    };
}