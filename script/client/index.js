import { sendMultipleProductDiscountClient } from "./product-discount-client/many.js";
import { sendMultipleClientAddresses } from "./client-address/many.js"
import { sendMultipleClients } from "./clients/many.js"

const loadClientModule = async () => {
    try {
        await sendMultipleClients();
        await sendMultipleClientAddresses();
        await sendMultipleProductDiscountClient();
    } catch (error) {
        console.log(error);
    }
}

export { loadClientModule };