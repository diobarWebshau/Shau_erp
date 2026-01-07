import { ProductDiscountClientResponseDto } from "@modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { ClientOrchestrator, ProductDiscountClientOrchestratorProps } from "@modules/features/client/orchestration/domain/client-orchestrator.types";
import { ClientAddressResponseDto } from "@modules/features/client/assigments/client-addresses/application/dto/client-address.model.schema";
import { ClientOrchestratorResponseDto } from "@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema";
import { ClientAddressProps } from "@modules/features/client/assigments/client-addresses/domain/client-address.types";
import { ClientResponseDto } from "@modules/core/client/application/dto/client.model.schema";
import { ClientSearchCriteria } from "@modules/core/client/domain/client.types";
import { ClientProps } from "@modules/core/client/domain/client.types";

type ClientOrchestratorResult = ClientOrchestratorResponseDto;
type ClientOrchestratorQuery = ClientOrchestrator;

interface ClientFullQueryResult extends ClientProps {
    addresses: ClientAddressProps[],
    discounts: ProductDiscountClientOrchestratorProps[]
};

interface ClientFullQueryResultDto extends ClientResponseDto {
    addresses: ClientAddressResponseDto[],
    discounts: ProductDiscountClientResponseDto[]
};

export type {
    ClientOrchestratorResult,
    ClientOrchestratorQuery,
    ClientFullQueryResult,
    ClientFullQueryResultDto,
    ClientSearchCriteria
};