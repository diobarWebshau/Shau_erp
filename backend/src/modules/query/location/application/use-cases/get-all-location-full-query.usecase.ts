import { LocationFullQueryResult, LocationSearchCriteria } from "../../domain/location-query.types";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { Transaction } from "sequelize";


export class GetAllLocationFullQueryUseCase {

    private readonly repo: ILocationQueryRepository;

    constructor(repo: ILocationQueryRepository) {
        this.repo = repo;
    };

    async execute(query: LocationSearchCriteria, tx?: Transaction) {
        const locationQueryReponses: LocationFullQueryResult[] = await this.repo.getAllLocationFullQuery(query, tx);
        return locationQueryReponses;
    };
};