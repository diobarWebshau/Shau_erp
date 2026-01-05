import "@config/env/env.loader";
import createServer from "./server.js";

process.on("unhandledRejection", (reason: unknown) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

createServer().catch((err: NodeJS.ErrnoException) => {
    const port = process.env.SERVER_PORT;
    if (err.code === "EADDRINUSE") {
        console.error(`Servidor corriendo en el puerto: ${port}`);
    } else if (err.code === "EACCES") {
        console.error(`No permission to bind port ${port}`);
    } else {
        console.error("Fatal server startup error:", err);
    }
    process.exit(1);
});
