import createApp from "./app.js";
import type { Express } from "express";
import type { Server } from "http";

const createServer = async (): Promise<Server> => {
    const app: Express = await createApp();

    const port: number = Number(process.env.SERVER_PORT);
    if (!Number.isInteger(port) || port <= 0) {
        throw new Error("Missing/invalid SERVER_PORT");
    }

    return new Promise<Server>((resolve, reject) => {
        const server: Server = app.listen(port);

        server.once("listening", () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
            resolve(server);
        });

        server.once("error", (err: Error) => {
            reject(err);
        });
    });
};

export default createServer;
