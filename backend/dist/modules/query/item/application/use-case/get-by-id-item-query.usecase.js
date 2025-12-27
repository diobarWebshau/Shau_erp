"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdItemQueryUseCase = void 0;
class GetByIdItemQueryUseCase {
    productRepo;
    itemRepo;
    inputRepo;
    constructor({ inputRepo, productRepo, itemRepo }) {
        this.inputRepo = inputRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
    }
    ;
    execute = async (id) => {
        const item = await this.itemRepo.findById(id);
        if (item) {
            let itemWithRelation;
            const { item_id, item_type } = item;
            if (item_type === "product") {
                const product = await this.productRepo.findById(item_id);
                itemWithRelation = {
                    ...item,
                    item: product
                };
            }
            else {
                const input = await this.inputRepo.findById(item_id);
                itemWithRelation = {
                    ...item,
                    item: input
                };
            }
            return itemWithRelation;
        }
        return item;
    };
}
exports.GetByIdItemQueryUseCase = GetByIdItemQueryUseCase;
