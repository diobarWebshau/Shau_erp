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
                throw new http_error_1.default(500, "No se pudo acceder a la locación despues de haber sido creado.");
            const { location_location_types: llt_query, location_production_lines: lpl_query, ...location_query } = locationQueryResponse;
            const locationFullResult = {
                location: location_query,
                location_location_types: llt_query,
                location_production_lines: lpl_query
            };
            await tx.commit();
            return locationFullResult;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreateLocationOrchestratorUseCase = CreateLocationOrchestratorUseCase;
;
