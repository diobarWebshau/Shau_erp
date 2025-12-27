import { IItemRepository } from "../../domain/item.repository.interface";
import { ItemProps } from "../../domain/item.type";
export declare class ItemRepository implements IItemRepository {
    findAll: () => Promise<ItemProps[]>;
    findById: (id: number) => Promise<ItemProps | null>;
}
