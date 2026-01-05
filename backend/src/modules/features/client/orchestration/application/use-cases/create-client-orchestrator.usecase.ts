import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ClientOrchestratorResponseDto, ProductDiscountClientResponseOrchestratorDto } from "../dto/client-orchestrator.model.schema";
import { ProductDiscountClientCreateProps } from "../../../assigments/product-discount-client/domain/product-discount-client.types";
import { ClientAddressResponseDto } from "../../../assigments/client-addresses/application/dto/client-address.model.schema";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { ClientAddressCreateProps } from "../../../assigments/client-addresses/domain/client-address.types";
import { IClientQueryRepository } from "@modules/query/client/domain/client-query.repository";
import { ClientResponseDto } from "@modules/core/client/application/dto/client.model.schema";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientFullQueryResult } from "@modules/query/client/domain/client-query.type";
import { ClientCreateOrchestrator } from "../../domain/client-orchestrator.types";
import { ClientProps } from "@modules/core/client/domain/client.types";
import HttpError from "@shared/errors/http/http-error";
import ImageHandler from "@helpers/imageHandlerClass";
import { sequelize } from "@config/mysql/sequelize";
import type { Transaction } from "sequelize";
import { Transaction as SequelizeTx } from "sequelize";

interface ICreateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository,
    clientRepo: IClientRepository,
    clientAddressRepo: IClientAddressRepository,
    clientQueryRepo: IClientQueryRepository
}

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

    execute = async (data: ClientCreateOrchestrator): Promise<ClientOrchestratorResponseDto> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { client, addresses, discounts }: ClientCreateOrchestrator = data;
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
            }

            const clientQueryResponse: ClientFullQueryResult | null = await this.clientQueryRepo.getByIdClientFullQuery(clientCreateResponse.id, tx);

            if (!clientQueryResponse)
                throw new HttpError(500, "No se pudo acceder el cliente despues de haber sido creado.");

            const { addresses: addrs, discounts: discs, ...clt }: ClientFullQueryResult = clientQueryResponse;

            const dataClient: ClientResponseDto = {
                ...clt,
                created_at: clt.created_at.toISOString(),
                updated_at: clt.updated_at.toISOString(),
            }
            const dataDiscounts: ProductDiscountClientResponseOrchestratorDto[] = discs.length ? await Promise.all(discs.map(async (disc) => ({
                ...disc,
                created_at: disc.created_at.toISOString(),
                updated_at: disc.updated_at.toISOString(),
                product: {
                    ...disc.product,
                    created_at: disc.product.created_at.toISOString(),
                    updated_at: disc.product.updated_at.toISOString(),
                    photo: disc.product.photo ? await ImageHandler.convertToBase64(disc.product.photo) : null
                }
            }))) : [];
            const dataAddresses: ClientAddressResponseDto[] = addrs.length ? await Promise.all(addrs.map(async (addr) => ({
                ...addr,
                created_at: addr.created_at.toISOString(),
                updated_at: addr.updated_at.toISOString(),
            }))) : [];
            const clientFullResult: ClientOrchestratorResponseDto = {
                client: dataClient,
                addresses: dataAddresses,
                discounts: dataDiscounts
            }
            await tx.commit();
            return clientFullResult;
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        };
    };
}