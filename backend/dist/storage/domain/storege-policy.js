"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storagePolicies = void 0;
exports.storagePolicies = {
    products: {
        baseDir: "products/tmp",
        requiresEntityId: false,
        maxFileSizeMb: 10,
        allowedMimeTypes: /^image\/(jpeg|png|webp|svg\+xml|avif)$/i,
    },
    inputs: {
        baseDir: "inputs/tmp",
        requiresEntityId: false,
        maxFileSizeMb: 10,
        allowedMimeTypes: /^image\/(jpeg|png|webp|svg\+xml|avif)$/i,
    },
    "shipping-orders": {
        baseDir: "shipping-orders",
        requiresEntityId: true,
        maxFileSizeMb: 10,
        allowedMimeTypes: /^image\/(jpeg|png|webp|svg\+xml|avif)$/i,
    },
};
