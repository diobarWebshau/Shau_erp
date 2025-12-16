import createServer from "../backend/src/server.js";
try {
    createServer();
} catch (error: unknown) {
    if (error instanceof Error)
        console.error(`An unexpected error occurred: ${error}`);
}
