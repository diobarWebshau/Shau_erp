import type { RequestHandler } from "express";
/**
 * MIDDLEWARE FINAL PARA EXPRESS
 * -----------------------------
 * Morgan devuelve un middleware compatible con Express,
 * por lo tanto lo tipamos como RequestHandler.
 *
 * MUY IMPORTANTE:
 * No se deben pasar generics a RequestHandler (como RequestHandler<Request,Response>)
 * porque Express no los admite y rompe la compatibilidad,
 * causando errores enormes de tipos y aparición de ANY.
 *
 * Esto:
 *    RequestHandler
 * es la forma correcta, estricta y totalmente segura.
 */
declare const morganUtil: RequestHandler;
export default morganUtil;
