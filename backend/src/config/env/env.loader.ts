import dotenvExpand from "dotenv-expand";
import dotenvSafe from "dotenv-safe";
import path from "path";

const loadEnv = (): void => {
    const root: string = process.cwd();
    const envRoot: string = path.join(root, "env");

    const envFile: string =
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : process.env.NODE_ENV === "test"
                ? ".env.test"
                : ".env.development";

    const envPath: string = path.join(envRoot, envFile);

    // 1) Cargar el .env (una sola carga real)
    dotenvSafe.config({
        allowEmptyValues: false,
        example: path.join(envRoot, ".env.example"),
        path: envPath,
    });

    // 2) Expandir process.env correctamente (AUTOMÁTICO)
    dotenvExpand.expand({});
};

loadEnv();