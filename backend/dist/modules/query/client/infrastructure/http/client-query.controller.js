"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryController = exports.mapClientFullQueryDomainToDto = exports.mapClientOrchestratorDomainToDto = void 0;
const get_by_id_client_query_orchestrator_usecase_1 = require("../../application/use-cases/get-by-id-client-query-orchestrator.usecase");
const get_all_client_query_orchestrator_usecase_1 = require("../../application/use-cases/get-all-client-query-orchestrator.usecase");
const get_by_id_client_full_query_usecase_1 = require("../../application/use-cases/get-by-id-client-full-query.usecase");
const get_all_client_full_query_usecase_1 = require("../../application/use-cases/get-all-client-full-query.usecase");
const client_query_repository_1 = require("../repository/client-query.repository");
const mapClientOrchestratorDomainToDto = (data) => {
    return ({
        client: {
            ...data.client,
            credit_limit: data.client.credit_limit ? data.client.credit_limit.toString() : null,
            updated_at: data.client.created_at.toISOString(),
            created_at: data.client.updated_at.toISOString()
        },
        addresses: data.addresses.map((addr) => {
            return ({
                ...addr,
                updated_at: addr.created_at.toISOString(),
                created_at: addr.updated_at.toISOString()
            });
        }),
        discounts: data.discounts.map((dsc) => {
            return ({
                ...dsc,
                product: {
                    ...dsc.product,
                    updated_at: dsc.product.created_at.toISOString(),
                    created_at: dsc.product.updated_at.toISOString(),
                    production_cost: dsc.product.toString(),
                    sale_price: dsc.product.sale_price?.toString()
                },
                discount_percentage: dsc.discount_percentage.toString(),
                created_at: dsc.created_at.toISOString(),
                updated_at: dsc.updated_at.toISOString(),
            });
        })
    });
};
exports.mapClientOrchestratorDomainToDto = mapClientOrchestratorDomainToDto;
const mapClientFullQueryDomainToDto = (data) => {
    return ({
        ...data,
        credit_limit: data.credit_limit ? data.credit_limit.toString() : null,
        updated_at: data.created_at.toISOString(),
        created_at: data.updated_at.toISOString(),
        addresses: data.addresses.map((addr) => {
            return ({
                ...addr,
                updated_at: addr.created_at.toISOString(),
                created_at: addr.updated_at.toISOString()
            });
        }),
        discounts: data.discounts.map((dsc) => {
            return ({
                ...dsc,
                product: {
                    ...dsc.product,
                    updated_at: dsc.product.created_at.toISOString(),
                    created_at: dsc.product.updated_at.toISOString(),
                    production_cost: dsc.product.toString(),
                    sale_price: dsc.product.sale_price?.toString()
                },
                discount_percentage: dsc.discount_percentage.toString(),
                created_at: dsc.created_at.toISOString(),
                updated_at: dsc.updated_at.toISOString(),
            });
        })
    });
};
exports.mapClientFullQueryDomainToDto = mapClientFullQueryDomainToDto;
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
        const query = req.query;
        const clientRecords = await this.getAllClientOrchestratorUseCase.execute(query);
        const clientResults = clientRecords.map(exports.mapClientOrchestratorDomainToDto);
        return res.status(200).json(clientResults);
    };
    getByIdClientOrchestrator = async (req, res) => {
        const { id } = req.params;
        const clientRecord = await this.getByIdClientOrchestratorUseCase.execute(Number(id));
        if (!clientRecord)
            return res.status(200).json(null);
        const clientResult = (0, exports.mapClientOrchestratorDomainToDto)(clientRecord);
        return res.status(200).json(clientResult);
    };
    getAllClientFullQuery = async (req, res) => {
        const query = req.query;
        const clientRecords = await this.getAllClientFullUseCase.execute(query);
        const clientResults = clientRecords.map(exports.mapClientFullQueryDomainToDto);
        return res.status(200).json(clientResults);
    };
    getByIdClientFullQuery = async (req, res) => {
        const { id } = req.params;
        const clientRecord = await this.getByIdClientFullUseCase.execute(Number(id));
        if (!clientRecord)
            return res.status(404).json(null);
        const clientResults = (0, exports.mapClientFullQueryDomainToDto)(clientRecord);
        return res.status(200).json(clientResults);
    };
}
exports.ClientQueryController = ClientQueryController;
;
