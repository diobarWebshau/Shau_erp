/**
 * pickEditableFields
 * ------------------------------------------------------------------
 * Este helper selecciona únicamente los campos que están permitidos 
 * para actualizar dentro del `body` recibido.
 * 
 * ✔ Es totalmente genérico y seguro gracias al uso de TypeScript avanzado.
 * ✔ Evita el uso de `any` y mantiene tipado estricto en toda la aplicación.
 * ✔ Protege contra la actualización accidental de campos no permitidos.
 * 
 * @template T - Tipo completo del modelo (por ejemplo: LocationTypeSchema).
 * @template K - Subconjunto de llaves de T que están autorizadas para actualizar.
 * 
 * @param body - Objeto parcial que llega del cliente (req.body).
 * @param editable - Lista de propiedades del modelo que SÍ se pueden actualizar.
 * 
 * @returns Un objeto que solo contiene llaves válidas para actualizar 
 *          y con tipos inferidos automáticamente.
 */
const pickEditableFields = <
    T extends Record<string, unknown>,   // T garantiza que el modelo es un objeto
    K extends keyof T                    // K asegura que los campos existan dentro del modelo
>(
    body: Partial<T>,                    // req.body puede no contener todos los campos del modelo
    editable: readonly K[]               // array de llaves permitidas (tipado estricto)
): Partial<Pick<T, K>> => {              // Retorno: SOLO los campos permitidos + tipados
    const result: Partial<Pick<T, K>> = {};

    /**
     * Recorremos la lista de campos editables.
     * 
     * - Si el cliente envió ese campo, lo copiamos.
     * - Si no lo envió, no lo agregamos.
     * 
     * De esta forma evitamos:
     *   ❌ actualizaciones masivas no controladas
     *   ❌ campos inesperados o maliciosos
     *   ❌ sobreescritura accidental de propiedades sensibles
     */
    for (const key of editable) {
        // Verifica si body contiene la propiedad
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            result[key] = body[key]; // TS garantiza que el tipo es correcto
        }
    }

    return result;
};

export { pickEditableFields };
