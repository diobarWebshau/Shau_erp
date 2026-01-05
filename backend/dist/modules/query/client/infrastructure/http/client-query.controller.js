"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryController = void 0;
const get_by_id_client_query_orchestrator_usecase_1 = require("../../application/use-cases/get-by-id-client-query-orchestrator.usecase");
const get_all_client_query_orchestrator_usecase_1 = require("../../application/use-cases/get-all-client-query-orchestrator.usecase");
const get_by_id_client_full_query_usecase_1 = require("../../application/use-cases/get-by-id-client-full-query.usecase");
const get_all_client_full_query_usecase_1 = require("../../application/use-cases/get-all-client-full-query.usecase");
const client_query_repository_1 = require("../repository/client-query.repository");
const client_query_query_mapper_1 = require("./client-query-query-mapper");
class ClientQueryController {
    repo;
    getAllClientOrchestratorUseCase;
    getByIdClientOrchestratorUseCase;
    getAllClientFullUseCase;
    getByIdClientFullUseCase;
    constructor() {
        this.repo = new client_query_repository_1.ClientQueryRepository();
        this.getAllClientFullUseCase = new get_all_client_full_query_usecase_1.GetAllClientFullQueryUseCase(this.repo);
        this.getAllClientOrchestratorUseCase = new get_all_client_query_orchestrator_usecase_1.GetAllClientsQueryOrchestratorUseCase(this.repo);
        this.getByIdClientFullUseCase = new get_by_id_client_full_query_usecase_1.GetByIdClientsFullQueryUseCase(this.repo);
        this.getByIdClientOrchestratorUseCase = new get_by_id_client_query_orchestrator_usecase_1.GetByIdClientsQueryOrchestratorUseCase(this.repo);
    }
    ;
    getAllClientOrchestrator = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, client_query_query_mapper_1.mapClientQueryToCriteria)(queryRequest);
        const clients = await this.getAllClientOrchestratorUseCase.execute(query);
        return res.status(200).json(clients);
    };
    getByIdClientOrchestrator = async (req, res) => {
        const { id } = req.params;
        const clientRecord = await this.getByIdClientOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(clientRecord);
    };
    getAllClientFullQuery = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, client_query_query_mapper_1.mapClientQueryToCriteria)(queryRequest);
        const clients = await this.getAllClientFullUseCase.execute(query);
        return res.status(200).json(clients);
    };
    getByIdClientFullQuery = async (req, res) => {
        const { id } = req.params;
        const clientRecord = await this.getByIdClientFullUseCase.execute(Number(id));
        if (!clientRecord)
            return res.status(404).json(null);
        return res.status(200).json(clientRecord);
    };
}
exports.ClientQueryController = ClientQueryController;
;
