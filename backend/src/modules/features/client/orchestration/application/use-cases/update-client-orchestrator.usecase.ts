import { ClientAddressCreateOrchestrator, ClientAddressUpdateOrchestrator, ClientUpdateOrchestrator, ProductDiscountClientCreateOrchestrator, ProductDiscountClientUpdateOrchestrator } from "../../domain/client-orchestrator.types";
import { ProductDiscountClientResponseDto } from "../../../assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ProductDiscountClientCreateProps } from "../../../assigments/product-discount-client/domain/product-discount-client.types";
import { ClientAddressResponseDto } from "../../../assigments/client-addresses/application/dto/client-address.model.schema";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { ClientAddressCreateProps } from "../../../assigments/client-addresses/domain/client-address.types";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientProps } from "@modules/core/client/domain/client.types";
import { sequelize } from "@config/mysql/sequelize";
import { Transaction } from "sequelize";
import { ClientOrchestratorResponseDto, ProductDiscountClientResponseOrchestratorDto } from "../dto/client-orchestrator.model.schema";
import { ClientFullQueryResult } from "@src/modules/query/client/domain/client-query.type";
import { IClientQueryRepository } from "@src/modules/query/client/domain/client-query.repository";
import { ClientResponseDto } from "@src/modules/core/client/application/dto/client.model.schema";
import HttpError from "@src/shared/errors/http/http-error";
import ImageHandler from "@src/helpers/imageHandlerClass";

interface IUpdateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository,
    clientAddressRepo: IClientAddressRepository,
    clientRepo: IClientRepository,
    clientQueryRepo: IClientQueryRepository
}

export class UpdateClientOrchestratorUseCase {

    private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    private readonly clientAddressRepo: IClientAddressRepository;
    private readonly clientRepo: IClientRepository;
    private readonly clientQueryRepo: IClientQueryRepository;

    constructor({ productDiscountClientRepo, clientAddressRepo, clientRepo, clientQueryRepo }: IUpdateClientOrchestratorUseCase) {
        this.productDiscountClientRepo = productDiscountClientRepo;
        this.clientRepo = clientRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientQueryRepo = clientQueryRepo;
    };

    execute = async (id: number, data: ClientUpdateOrchestrator): Promise<ClientOrchestratorResponseDto> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {

            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { client, addresses_manager, discounts_manager }: ClientUpdateOrchestrator = data;

            // --------------------------------------------------
            // |🔹 CLIENT                                       |
            // --------------------------------------------------
            const clientUpdateResponse: ClientProps = await this.clientRepo.update(id, client, tx);

            // --------------------------------------------------
            // |🔹 MANAGERS                                     |
            // --------------------------------------------------
            const isChangeAddressManager: boolean =
                (addresses_manager?.added ?? []).length > 0 ||
                (addresses_manager?.updated ?? []).length > 0 ||
                (addresses_manager?.deleted ?? []).length > 0;

            const isChangeDiscountManager: boolean =
                (discounts_manager?.added ?? []).length > 0 ||
                (discounts_manager?.updated ?? []).length > 0 ||
                (discounts_manager?.deleted ?? []).length > 0;

            // --------------------------------------------------
            // |🔹 CLIENT-ADDRESS                               |
            // --------------------------------------------------
            if (isChangeAddressManager) {
                const added: ClientAddressCreateOrchestrator[] = addresses_manager?.added ?? [];
                const deleted: ClientAddressResponseDto[] = addresses_manager?.deleted ?? [];
                const updated: ClientAddressUpdateOrchestrator[] = addresses_manager?.updated ?? [];

                if (added.length) {
                    for (const addr of added) {
                        const newAddress: ClientAddressCreateProps = {
                            ...addr,
                            client_id: clientUpdateResponse.id
                        }
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
                        const { id, ...rest }: ClientAddressUpdateOrchestrator = addr;
                        await this.clientAddressRepo.update(id, rest, tx);
                    }
                }

            }
            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-CLIENT                      |
            // --------------------------------------------------
            if (isChangeDiscountManager) {
                const added: ProductDiscountClientCreateOrchestrator[] = discounts_manager?.added ?? [];
                const deleted: ProductDiscountClientResponseDto[] = discounts_manager?.deleted ?? [];
                const updated: ProductDiscountClientUpdateOrchestrator[] = discounts_manager?.updated ?? [];

                if (added.length) {
                    for (const disc of added) {
                        const newDiscount: ProductDiscountClientCreateProps = {
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
                        const { id, ...rest }: ProductDiscountClientUpdateOrchestrator = disc;
                        await this.productDiscountClientRepo.update(id, rest, tx);
                    }
                }
            }
            const clientQueryResponse: ClientFullQueryResult | null = await this.clientQueryRepo.getByIdClientFullQuery(clientUpdateResponse.id, tx);

            if (!clientQueryResponse)
                throw new HttpError(500, "No se pudo acceder el cliente despues de haber sido actualizadp.");

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
            return clientFullResult
        } catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}