"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
// **** Entidad de dominio ****
class ProductEntity {
    props;
    // constructor
    constructor(props) {
        this.props = props;
    }
    // acessors keys
    get id() { return this.props.id; }
    get name() { return this.props.name; }
    get sale_price() { return this.props.sale_price; }
    // Reglas de negocio
    isDraft() { return this.props.is_draft === true; }
    isActive() { return this.props.is_active === true; }
    // Reglas de validación
    validateCreate() {
        if (!this.props.name)
            throw new Error("Product must have a name");
        if (this.props.is_active)
            throw new Error("Sale price cannot be negative");
    }
    toJSON() { return this.props; }
}
exports.ProductEntity = ProductEntity;
