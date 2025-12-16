/**
 * =====================================================================
 * Declaración del módulo "dotenv-safe"
 * =====================================================================
 *
 * Esta declaración le permite a TypeScript entender cómo funciona el
 * paquete "dotenv-safe", ya que este paquete no trae typings oficiales.
 *
 * Gracias a esta declaración:
 * - TS puede validar parámetros al usar dotenvSafe.config()
 * - Se obtiene autocompletado
 * - Se evita el error: "Could not find a declaration file..."
 * - No se trabaja con valores `any`
 *
 * En resumen, esta declaración hace que "dotenv-safe" sea utilizable
 * dentro de un entorno estrictamente tipado.
 */

declare module "dotenv-safe" {

    /**
     * Opciones que acepta dotenvSafe.config()
     */
    interface DotenvSafeOptions {

        /**
         * Si es true, permite valores vacíos ("").
         * Si es false, lanza error si alguna variable está vacía.
         * Útil para garantizar que todas las variables estén realmente definidas.
         */
        allowEmptyValues?: boolean;

        /**
         * Ruta al archivo de plantilla (.env.example) que contiene
         * todas las variables que deben existir.
         * dotenv-safe comparará este archivo con el .env real.
         */
        example?: string;

        /**
         * Ruta al archivo .env que se debe cargar.
         * Normalmente no se usa, porque dotenv o loaders personalizados
         * se encargan de establecer esta ruta antes.
         */
        path?: string;

        /**
         * Alias antiguo de "example". Se mantiene por retrocompatibilidad.
         * No se recomienda usarlo en proyectos nuevos.
         */
        sample?: string;
    }

    /**
     * Función principal del módulo.
     * Valida:
     * - que exista un archivo .env
     * - que existan todas las variables del .env.example
     * - que ninguna esté vacía (según configuración)
     */
    export function config(options?: DotenvSafeOptions): void;

    /**
     * Exportación por defecto con la función config incluida.
     */
    export default { config };
}
