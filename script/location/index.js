import { sendMultipleLocationLocationType } from "./location-location-type/many.js"
import { sendMultipleLocationTypes } from "./location-types/many.js"
import { sendMultipleLocations } from "./location/many.js"
import { sendMultipleLocationProductionLine } from "./location-production-line/many.js"

const loadLocationModule = async () => {
    try {
        await sendMultipleLocations();
        await sendMultipleLocationTypes();
        await sendMultipleLocationLocationType();
        await sendMultipleLocationProductionLine();
    } catch (error) {
        console.log(error);
    }
};

export { loadLocationModule };