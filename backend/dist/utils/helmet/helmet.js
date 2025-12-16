"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
/**
 * Configuración estrictamente tipada del CSP
 */
const CONFIG_CONTENT_SECURITY_POLICY = {
    directives: {
        scriptSrc: ["'self'", "'unsafe-eval'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'self'"],
        childSrc: ["'self'"],
        mediaSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:3000"],
        defaultSrc: ["'self'"],
    },
};
/**
 * Helmet devuelve funciones que son middlewares de Express
 * ⇒ El tipo correcto es RequestHandler[]
 */
const helmetUtil = [
    helmet_1.default.contentSecurityPolicy(CONFIG_CONTENT_SECURITY_POLICY),
    helmet_1.default.frameguard({ action: "deny" }),
    helmet_1.default.referrerPolicy({ policy: "no-referrer" }),
    helmet_1.default.noSniff(),
    helmet_1.default.hidePoweredBy(),
];
exports.default = helmetUtil;
