import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { ILocationQueryRepository } from "@src/modules/query/location/domain/location-query.repository.interface";
import { LocationOrchestrator } from "../../domain/location-orchestrator.types";
import { ILocationRepository } from "@src/modules/core/location/domain/location.repository.interface";
import { LocationOrchestratorCreateDto } from "../dto/location-orchestrator.model.schema";
interface ICreateLocationOrchestratorUseCase {
    locationRepo: ILocationRepository;
    locationLocationType: ILocationLocationTypeRepository;
    locationProductionLineType: ILocationProductionLineRepository;
    locationQueryRepo: ILocationQueryRepository;
}
export declare class CreateLocationOrchestratorUseCase {
    private readonly locationRepo;
    private readonly locationLocationTypeRepo;
    private readonly locationProductionLineRepo;
    private readonly locationQueryRepo;
    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }: ICreateLocationOrchestratorUseCase);
    execute: (data: LocationOrchestratorCreateDto) => Promise<LocationOrchestrator>;
}
export {};
