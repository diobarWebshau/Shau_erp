"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOrchestratorController = void 0;
const product_discount_client_repository_1 = require("../../assigments/product-discount-client/infrastructure/repository/product-discount-client.repository");
const client_address_repository_1 = require("../../assigments/client-addresses/infrastructure/repository/client-address.repository");
const client_query_controller_1 = require("./../../../../query/client/infrastructure/http/client-query.controller");
const client_query_repository_1 = require("@modules/query/client/infrastructure/repository/client-query.repository");
const create_client_orchestrator_usecase_1 = require("../application/use-cases/create-client-orchestrator.usecase");
const update_client_orchestrator_usecase_1 = require("../application/use-cases/update-client-orchestrator.usecase");
const client_repository_1 = require("@modules/core/client/infrastructure/repository/client.repository");
class ClientOrchestratorController {
    createClientOrchestratorUseCase;
    updateClientOrchestratorUseCase;
    productDiscountClientRepo;
    clientAddressRepo;
    clientQueryRepo;
    clientRepo;
    constructor() {
        this.clientRepo = new client_repository_1.ClientRepository();
        this.clientAddressRepo = new client_address_repository_1.ClientAddressRepository();
        this.productDiscountClientRepo = new product_discount_client_repository_1.ProductDiscountClientRepository();
        this.clientQueryRepo = new client_query_repository_1.ClientQueryRepository();
        this.createClientOrchestratorUseCase = new create_client_orchestrator_usecase_1.CreateClientOrchestratorUseCase({
            clientRepo: this.clientRepo,
            clientAddressRepo: this.clientAddressRepo,
            clientQueryRepo: this.clientQueryRepo,
            productDiscountClientRepo: this.productDiscountClientRepo
        });
        this.updateClientOrchestratorUseCase = new update_client_orchestrator_usecase_1.UpdateClientOrchestratorUseCase({
            clientAddressRepo: this.clientAddressRepo,
            clientRepo: this.clientRepo,
            productDiscountClientRepo: this.productDiscountClientRepo,
            clientQueryRepo: this.clientQueryRepo
        });
    }
    ;
    create = async (req, res) => {
        const { payload } = req.body;
        const response = await this.createClientOrchestratorUseCase.execute(payload);
        const result = (0, client_query_controller_1.mapClientOrchestratorDomainToDto)(response);
        return res.status(201).json(result);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const { payload } = req.body;
        const response = await this.updateClientOrchestratorUseCase.execute(Number(id), payload);
        const result = (0, client_query_controller_1.mapClientOrchestratorDomainToDto)(response);
        return res.status(200).json(result);
    };
}
exports.ClientOrchestratorController = ClientOrchestratorController;
;
