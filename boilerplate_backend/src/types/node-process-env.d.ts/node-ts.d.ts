/**
 * =====================================================================
 * Declaración de process.env (Tipado de variables de entorno)
 * =====================================================================
 *
 * Esta declaración le indica a TypeScript qué variables de entorno
 * existen realmente en tu proyecto y de qué tipo son.
 *
 * Gracias a esto:
 * - No necesitas usar "!" ni castings para acceder a process.env.*
 * - TypeScript considera estas variables como definidas y seguras
 * - Se obtiene autocompletado
 * - Se eliminan errores típicos de "string | undefined"
 *
 * Esta declaración NO carga ninguna variable.
 * Solo le dice a TypeScript cómo deben tiparse.
 */
declare namespace NodeJS {
    interface ProcessEnv {

        /**
         * Indica en qué entorno está corriendo la aplicación.
         * El valor siempre debe ser uno de estos tres.
         */
        NODE_ENV: "development" | "production" | "test";

        /**
         * Puerto donde corre el servidor.
         * Se define como string porque process.env siempre produce strings,
         * aunque luego se convierta a number dentro del código.
         */
        SERVER_PORT: string;

        /**
         * Host de la base de datos.
         * Siempre debe existir para que la app pueda conectarse.
         */
        DB_HOST: string;

        /**
         * Usuario de la base de datos.
         */
        DB_USER: string;

        /**
         * Contraseña del usuario de la base de datos.
         */
        DB_PASS: string;
        /**
         * Puerto de la base de datos.
         */
        DB_PORT: string;

        /**
         * Nombre de la base de datos.
         */
        DB_NAME: string;
        /**
         * Secret key para firmar JWT.
         * Debe estar siempre presente y nunca vacía.
         */
        JWT_SECRET: string;

        /**
         * Ruta base donde el sistema almacenará archivos.
         */
        FILES_PATH: string;
    }
}