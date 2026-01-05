
import { loadProductModule } from "./product/index.js";
import { loadLocationModule } from "./location/index.js";
import { loadClientModule } from "./client/index.js"
import { loadProductionLineModule } from "./production-line/index.js"

try {
    await loadProductModule();
    await loadClientModule();
    await loadProductionLineModule();
    await loadLocationModule();
} catch (e) {
    console.log(e);
}