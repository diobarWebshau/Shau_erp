/**
 * ---------------------------------------------------------------
 *  Declaración de variables globales de Node.js para proyectos
 *  que ESCRIBEN código estilo ESM, pero COMPILAN a CommonJS.
 *
 *  ¿Por qué es necesario?
 *  -----------------------
 *  - En CommonJS, Node **sí provee** __dirname y __filename.
 *  - Pero TypeScript, al ver código con sintaxis ESM (import ...),
 *    asume que estás en un entorno donde esas variables NO existen.
 *
 *  Esto genera errores como:
 *    "__dirname implicitly has type 'any'"
 *    "__filename does not exist on type 'ImportMeta'"
 *
 *  Esta declaración global le indica a TypeScript que ambas variables
 *  SÍ existen durante la ejecución, porque el runtime final es CommonJS.
 *
 *  Esto NO crea variables nuevas.
 *  Simplemente elimina errores de tipado.
 * ---------------------------------------------------------------
 */

declare const __dirname: string;
declare const __filename: string;
