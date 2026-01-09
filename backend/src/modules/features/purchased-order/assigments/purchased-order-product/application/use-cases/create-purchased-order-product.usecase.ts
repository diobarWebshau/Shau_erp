import { IPurchasedOrderRepository } from "@modules/features/purchased-order/domain/purchased-order.repository.interface";
import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProps } from "@modules/features/purchased-order/domain/purchased-order.types";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { PurchasedOrderProductCreateDto } from "../dto/purchased-order-product.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo: IPurchasedOrderProductRepository,
    productRepo: IProductRepository,
    purchasedOrderRepo: IPurchasedOrderRepository
};

const mapPopCraeteDtoToDomain = (data: PurchasedOrderProductCreateDto): PurchasedOrderProductCreateProps => {
    return ({
        ...data,
        original_price: DecimalVO.from(data.original_price),
        qty: DecimalVO.from(data.qty),
        recorded_price: DecimalVO.from(data.recorded_price),
    });
};

export class CreatePurchasedOrderProductUseCase {

    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    private readonly productRepo: IProductRepository;
    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor({ productRepo, purchasedOrderProductRepo, purchasedOrderRepo }: ICreatePurchasedOrderProductUseCase) {
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productRepo = productRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
    };
    execute = async (data: PurchasedOrderProductCreateDto, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const createData = mapPopCraeteDtoToDomain(data);
        const validatePurchasedOrder: PurchasedOrderProps | null = await this.purchasedOrderRepo.findById(createData.purchase_order_id, tx);
        if (!validatePurchasedOrder) throw new HttpError(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const validateProduct: ProductProps | null = await this.productRepo.findById(createData.product_id, tx);
        if (!validateProduct) throw new HttpError(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const purchasedOrderProductResponse: PurchasedOrderProductProps = await this.purchasedOrderProductRepo.create(createData, tx);
        return purchasedOrderProductResponse;
    };
};