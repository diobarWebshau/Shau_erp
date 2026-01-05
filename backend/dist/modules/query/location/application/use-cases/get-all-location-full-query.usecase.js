"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLocationFullQueryUseCase = void 0;
class GetAllLocationFullQueryUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async execute(query, tx) {
        const LocationReponses = await this.repo.getAllLocationFullQuery(query, tx);
        const LocationResultOrchestrator = [];
        for (const plro of LocationReponses) {
            const { location_location_types, location_production_lines, ...rest } = plro;
            const dataLocation = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataLocationLocationTypes = (location_location_types && location_location_types.length) ? await Promise.all(location_location_types.map(async (llt) => ({
                ...llt,
                location: {
                    ...llt.location,
                    created_at: llt.location.created_at.toISOString(),
                    updated_at: llt.location.updated_at.toISOString()
                },
                location_type: {
                    ...llt.location_type,
                    created_at: llt.location_type.created_at.toISOString(),
                    updated_at: llt.location_type.updated_at.toISOString()
                }
            }))) : [];
            const dataLocationProductionLine = (location_production_lines && location_production_lines.length) ? await Promise.all(location_production_lines.map(async (lpl) => ({
                ...lpl,
                location: {
                    ...lpl.location,
                    created_at: lpl.location.created_at.toISOString(),
                    updated_at: lpl.location.updated_at.toISOString()
                },
                production_line: {
                    ...lpl.production_line,
                    created_at: lpl.production_line.created_at.toISOString(),
                    updated_at: lpl.production_line.updated_at.toISOString()
                }
            }))) : [];
            const LocationFullResult = {
                ...dataLocation,
                location_location_types: dataLocationLocationTypes,
                location_production_lines: dataLocationProductionLine
            };
            LocationResultOrchestrator.push(LocationFullResult);
        }
        ;
        return LocationResultOrchestrator;
    }
    ;
}
exports.GetAllLocationFullQueryUseCase = GetAllLocationFullQueryUseCase;
;
