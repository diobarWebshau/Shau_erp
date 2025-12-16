import type { DiskStorageOptions, StorageEngine } from "multer";
import type { Request } from "express";
import type { Multer } from "multer";
import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Directorio raíz absoluto para asegurar rutas correctas en producción y dev.
 */
const rootDir: string = path.resolve();

/**
 * Describe una ruta de almacenamiento asociada a un módulo del ERP.
 */
interface StorageRoute {
  model: string;
  directory: string;
}

/**
 * Rutas dinámicas creadas para cada módulo.
 */
const storageRoutes: StorageRoute[] = [];
/**
 * Modelos del ERP que requieren subida de archivos.
 */
const modelDirectories: string[] = ["inputs", "products", "shipping-orders"] as const;

/**
 * Crea las carpetas necesarias para almacenamiento.
 */
const createUploadDirectories = (): void => {
  modelDirectories.forEach((model) => {
    const uploadDir = path.join(rootDir, process.env.FILES_PATH, model);

    if (!storageRoutes.some((route) => route.model === model)) {
      storageRoutes.push({ model, directory: uploadDir });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  });
}

createUploadDirectories();

/**
 * Opciones definitivas para DiskStorage completamente tipadas.
 */
const storageOptions: DiskStorageOptions = {
  destination(req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {
    const url: string = req.originalUrl.toLowerCase();

    const matchedRoute: StorageRoute | undefined = storageRoutes.find(({ model }) =>
      new RegExp(`/${model}(/|$)`).test(url)
    );

    let directory: string = matchedRoute?.directory ?? path.join(rootDir, process.env.FILES_PATH);

    /**
     * Caso especial: shipping-orders crea subcarpetas por ID.
     */
    if (matchedRoute?.model === "shipping-orders" && req.params.id) {
      const shippingId: string = req.params.id;
      const subdir: string = path.join(directory, shippingId);

      if (!fs.existsSync(subdir)) {
        try {
          fs.mkdirSync(subdir, { recursive: true });
        } catch {
          // Multer exige string → nunca undefined
          return cb(
            new Error(`Error creating directory for shipping_order_id ${shippingId}`),
            ""
          );
        }
      }

      return cb(null, subdir);
    }

    cb(null, directory);
  },

  filename(_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {
    const extension: string = path.extname(file.originalname);
    const filename: string = `${randomUUID()}-${Date.now()}${extension}`;
    cb(null, filename);
  }
};

/**
 * Storage tipado completamente como StorageEngine (Multer 1.x)
 */
const storage: StorageEngine = multer.diskStorage(storageOptions);

/**
 * Filtro de tipos de archivo completamente tipado.
 */
const fileFilter = (_req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile?: boolean) => void): void => {
  const allowedMimeTypes: RegExp = /jpeg|jpg|png|gif|webp|bmp|tiff|x-icon|svg\+xml|heic|heif|avif/;
  if (allowedMimeTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

/**
 * Multer final 100% tipado.
 * 10 MB
 */
const upload: Multer = multer({ storage, fileFilter, limits: { fieldSize: 10 * 1024 * 1024 } });

export default upload;
