import { sendMultipleProductionLineProducts } from "./production_lines_products/many.js";
import { sendMultipleProductionLines } from "./production_lines/many.js";

export const loadProductionLineModule = async () => {
    try {
        await sendMultipleProductionLines();
        await sendMultipleProductionLineProducts();
    } catch (error) {
        console.log(error);
    }
};
