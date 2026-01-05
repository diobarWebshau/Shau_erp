import { LocationQueryResultDto, LocationSearchCriteria } from "../../domain/location-query.types";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { Transaction } from "sequelize";
export declare class GetAllLocationFullQueryUseCase {
    private readonly repo;
    constructor(repo: ILocationQueryRepository);
    execute(query: LocationSearchCriteria, tx?: Transaction): Promise<LocationQueryResultDto[]>;
}
