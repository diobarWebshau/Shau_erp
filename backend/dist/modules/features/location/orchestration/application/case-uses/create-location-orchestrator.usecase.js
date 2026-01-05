"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocationOrchestratorUseCase = void 0;
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("@src/config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class CreateLocationOrchestratorUseCase {
    locationRepo;
    locationLocationTypeRepo;
    locationProductionLineRepo;
    locationQueryRepo;
    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }) {
        this.locationRepo = locationRepo;
        this.locationLocationTypeRepo = locationLocationType;
        this.locationProductionLineRepo = locationProductionLineType;
        this.locationQueryRepo = locationQueryRepo;
    }
    ;
    execute = async (data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types, location_production_lines, location } = data;
            const locationResponse = await this.locationRepo.create(location, tx);
            if (location_location_types && location_location_types.length) {
                for (const llt of location_location_types) {
                    const newllt = {
                        ...llt,
                        location_id: locationResponse.id
                    };
                    await this.locationLocationTypeRepo.create(newllt, tx);
                }
                ;
            }
            ;
            if (location_production_lines && location_production_lines.length) {
                for (const lpl of location_production_lines) {
                    const newLpl = {
                        ...lpl,
                        location_id: locationResponse.id
                    };
                    await this.locationProductionLineRepo.create(newLpl, tx);
                }
                ;
            }
            ;
            const locationQueryResponse = await this.locationQueryRepo.getByIdLocationFullQuery(locationResponse.id, tx);
            if (!locationQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder a la locación despues de haber sido creada.");
            const { location_location_types: lltQuery, location_production_lines: lplQuery, ...rest } = locationQueryResponse;
            const dataLocation = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataLocationLocationType = lltQuery.map((llt) => ({
                ...llt,
                location: {
                    ...llt.location,
                    created_at: llt.location.created_at.toISOString(),
                    updated_at: llt.location.updated_at.toISOString(),
                },
                location_type: {
                    ...llt.location_type,
                    created_at: llt.location_type.created_at.toISOString(),
                    updated_at: llt.location_type.updated_at.toISOString(),
                }
            }));
            const dataLocationProductionLine = lplQuery.map((lpl) => ({
                ...lpl,
                location: {
                    ...lpl.location,
                    created_at: lpl.location.created_at.toISOString(),
                    updated_at: lpl.location.updated_at.toISOString(),
                },
                production_line: {
                    ...lpl.production_line,
                    created_at: lpl.production_line.created_at.toISOString(),
                    updated_at: lpl.production_line.updated_at.toISOString(),
                }
            }));
            const locationFullResul = {
                location: dataLocation,
                location_location_types: dataLocationLocationType,
                location_production_lines: dataLocationProductionLine
            };
            await tx.commit();
            return locationFullResul;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreateLocationOrchestratorUseCase = CreateLocationOrchestratorUseCase;
;
