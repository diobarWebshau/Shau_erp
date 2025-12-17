import "@config/env/env.loader";
import createServer from "./server.js";

try { createServer() }
catch (error: unknown) { if (error instanceof Error) console.error(`Un error inesperado ha ocurrido:  ${error}`); }