import { sendMultipleInputs } from "./input/many.js";
import { sendMultipleProducts } from "./product/many.js";
import { sendMultipleInputTypes } from "./input-type/many.js";
import { sendMultipleProcesses } from "./process/many.js";
import { sendMultipleProductProcesses } from "./product_process/many.js";
import { sendMultipleProductsInputs } from "./product-input/many.js";
import { sendMultipleProductDiscountRanges } from "./product-discount-range/many.js";
import { sendMultipleProductsInputsProcesses } from "./product-input-process/many.js";

const loadProductModule = async () => {
    try {

        await sendMultipleProducts();
        await sendMultipleInputTypes();
        await sendMultipleInputs();
        await sendMultipleProcesses();

        await sendMultipleProductDiscountRanges();
        await sendMultipleProductsInputs();
        await sendMultipleProductProcesses();
        await sendMultipleProductsInputsProcesses();
    } catch (e) {
        console.log('error en script del modulo products', e);
    }
};

export { loadProductModule };