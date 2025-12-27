import { ProductProps, ProductSearchCriteria } from "@modules/core/product/domain/product.types";
import { InputProps, InputSearchCriteria } from "@modules/core/input/domain/input.types";
import { ItemProps } from "@modules/features/items/domain/item.type";

type ItemQueryRelation = InputProps | ProductProps;

type ItemQueryProps = ItemProps & {
    item: ItemQueryRelation | null;
};

type ItemSearchCriteria = ProductSearchCriteria | InputSearchCriteria;

export type {
    ItemQueryProps,
    ItemQueryRelation,
    ItemSearchCriteria
};