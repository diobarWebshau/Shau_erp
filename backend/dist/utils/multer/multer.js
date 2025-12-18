"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Directorio raíz absoluto para asegurar rutas correctas en producción y dev.
 */
const rootDir = path_1.default.resolve();
/**
 * Rutas dinámicas creadas para cada módulo.
 */
const storageRoutes = [];
/**
 * Modelos del ERP que requieren subida de archivos.
 */
const modelDirectories = ["inputs", "products", "shipping-orders"];
/**
 * Crea las carpetas necesarias para almacenamiento.
 */
const createUploadDirectories = () => {
    modelDirectories.forEach((model) => {
        const uploadDir = path_1.default.join(rootDir, process.env.FILES_PATH, model);
        if (!storageRoutes.some((route) => route.model === model)) {
            storageRoutes.push({ model, directory: uploadDir });
        }
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
    });
};
createUploadDirectories();
/**
 * Opciones definitivas para DiskStorage completamente tipadas.
 */
const storageOptions = {
    destination(req, _file, cb) {
        const url = req.originalUrl.toLowerCase();
        const matchedRoute = storageRoutes.find(({ model }) => new RegExp(`/${model}(/|$)`).test(url));
        let directory = matchedRoute?.directory ?? path_1.default.join(rootDir, process.env.FILES_PATH);
        /**
         * Caso especial: shipping-orders crea subcarpetas por ID.
         */
        if (matchedRoute?.model === "shipping-orders" && req.params.id) {
            const shippingId = req.params.id;
            const subdir = path_1.default.join(directory, shippingId);
            if (!fs_1.default.existsSync(subdir)) {
                try {
                    fs_1.default.mkdirSync(subdir, { recursive: true });
                }
                catch {
                    // Multer exige string → nunca undefined
                    return cb(new Error(`Error creating directory for shipping_order_id ${shippingId}`), "");
                }
            }
            return cb(null, subdir);
        }
        cb(null, directory);
    },
    filename(_req, file, cb) {
        const extension = path_1.default.extname(file.originalname);
        const filename = `${(0, crypto_1.randomUUID)()}-${Date.now()}${extension}`;
        cb(null, filename);
    }
};
/**
 * Storage tipado completamente como StorageEngine (Multer 1.x)
 */
const storage = multer_1.default.diskStorage(storageOptions);
/**
 * Filtro de tipos de archivo completamente tipado.
 */
const fileFilter = (_req, file, cb) => {
    const allowedMimeTypes = /jpeg|jpg|png|gif|webp|bmp|tiff|x-icon|svg\+xml|heic|heif|avif/;
    if (allowedMimeTypes.test(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed"), false);
    }
};
/**
 * Multer final 100% tipado.
 * 10 MB
 */
const upload = (0, multer_1.default)({ storage, fileFilter, limits: { fieldSize: 10 * 1024 * 1024 } });
exports.default = upload;
