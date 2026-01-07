import { ClientAddressCreateOrchestrator, ClientAddressUpdateOrchestrator, ClientOrchestrator, ClientUpdateOrchestrator, ProductDiscountClientCreateOrchestrator, ProductDiscountClientUpdateOrchestrator } from "../../domain/client-orchestrator.types";
import { ProductDiscountClientResponseDto } from "../../../assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { IProductDiscountClientRepository } from "../../../assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ProductDiscountClientCreateProps } from "../../../assigments/product-discount-client/domain/product-discount-client.types";
import { ClientAddressResponseDto } from "../../../assigments/client-addresses/application/dto/client-address.model.schema";
import { IClientAddressRepository } from "../../../assigments/client-addresses/domain/client-address.repository.interface";
import { ClientAddressCreateProps } from "../../../assigments/client-addresses/domain/client-address.types";
import { IClientQueryRepository } from "@src/modules/query/client/domain/client-query.repository";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ClientFullQueryResult } from "@src/modules/query/client/domain/client-query.type";
import { ClientOrchestratorUpdateDto } from "../dto/client-orchestrator.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { ClientProps } from "@modules/core/client/domain/client.types";
import HttpError from "@src/shared/errors/http/http-error";
import { sequelize } from "@config/mysql/sequelize";
import { Transaction } from "sequelize";

interface IUpdateClientOrchestratorUseCase {
    productDiscountClientRepo: IProductDiscountClientRepository,
    clientAddressRepo: IClientAddressRepository,
    clientRepo: IClientRepository,
    clientQueryRepo: IClientQueryRepository
}


const mapClientOrchestratorUpdateDtoToDomain = (data: ClientOrchestratorUpdateDto): ClientUpdateOrchestrator => {

    const { addresses_manager, discounts_manager, client } = data;

    const { credit_limit, ...rest_client } = client;

    return {
        client: {
            ...rest_client,
            ...(
                credit_limit !== undefined
                    ? { credit_limit: credit_limit === null ? null : DecimalVO.from(credit_limit) }
                    : {}
            ),
        },
        addresses_manager: addresses_manager,
        discounts_manager: {
            added: discounts_manager.added.map((add) => {
                return {
                    ...add,
                    discount_percentage: DecimalVO.from(add.discount_percentage)
                }
            }),
            updated: discounts_manager.updated.map((upt) => {
                const { discount_percentage, ...rest } = upt;
                return {
                    ...rest,
                    ...(discount_percentage !== undefined
                        ? { discount_percentage: DecimalVO.from(discount_percentage) }
                        : {}),
                };
            }),
            deleted: discounts_manager.deleted
        }
    };
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

    execute = async (id: number, data: ClientOrchestratorUpdateDto): Promise<ClientOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {

            const updateData = mapClientOrchestratorUpdateDtoToDomain(data);

            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { client, addresses_manager, discounts_manager }: ClientUpdateOrchestrator = updateData;

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
                    for (const disc of updated) {
                        const { id, ...rest }: ProductDiscountClientUpdateOrchestrator = disc;
                        await this.productDiscountClientRepo.update(id, rest, tx);
                    }
                }
            }
            const clientQueryResponse: ClientFullQueryResult | null = await this.clientQueryRepo.getByIdClientFullQuery(clientUpdateResponse.id, tx);

            if (!clientQueryResponse) throw new HttpError(500, "No se pudo acceder el cliente despues de haber sido creado.");

            const { addresses: addresses_query, discounts: discounts_query, ...client_query }: ClientFullQueryResult = clientQueryResponse;

            const clientFullResult: ClientOrchestrator = {
                client: client_query,
                addresses: addresses_query,
                discounts: discounts_query
            };
            await tx.commit();
            return clientFullResult;
        } catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}