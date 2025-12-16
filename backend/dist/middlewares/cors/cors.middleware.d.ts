import type { CorsRequest } from "cors";
declare const corsMiddleware: (req: CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export default corsMiddleware;
