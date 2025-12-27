"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllItemQueryUseCase = void 0;
class GetAllItemQueryUseCase {
    productRepo;
    itemRepo;
    inputRepo;
    constructor({ inputRepo, productRepo, itemRepo }) {
        this.inputRepo = inputRepo;
        this.itemRepo = itemRepo;
        this.productRepo = productRepo;
    }
    ;
    execute = async (query) => {
        const [products, inputs, items] = await Promise.all([
            this.productRepo.findAll(query),
            this.inputRepo.findAll(query),
            this.itemRepo.findAll()
        ]);
        const productMap = new Map(products.map(p => [p.id, p]));
        const inputMap = new Map(inputs.map(i => [i.id, i]));
        return items
            .filter(item => item.item_type === "product"
            ? productMap.has(item.item_id)
            : inputMap.has(item.item_id))
            .map(item => ({
            ...item,
            item: item.item_type === "product"
                ? productMap.get(item.item_id) ?? null
                : inputMap.get(item.item_id) ?? null
        }));
    };
}
exports.GetAllItemQueryUseCase = GetAllItemQueryUseCase;
