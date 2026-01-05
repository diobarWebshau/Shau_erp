interface ProductionLineProductProps {
    id: number,
    production_line_id: number,
    product_id: number
};

type ProductionLineProductCreateProps = Omit<ProductionLineProductProps, "id">;
type ProductionLineProductUpdateProps = Partial<ProductionLineProductCreateProps>;

export type {
    ProductionLineProductProps,
    ProductionLineProductCreateProps,
    ProductionLineProductUpdateProps
};