import createApp from "./app.js";
import { Express } from "express";
import { Server } from "http";
import { AddressInfo } from "net";

const createServer = (): Server => {
    const app: Express = createApp();
    const port: string = (process.env.SERVER_PORT) ?? ""
    const server: Server = app.listen(port, () => {
        const address: string | AddressInfo | null = server.address();
        if (typeof address === "string") console.log(`Server listening on ${address}`);
        else if (address && typeof address === "object") console.log(`Server listening on the port ${address.port}`)
    })
    return server;
}

export default createServer;