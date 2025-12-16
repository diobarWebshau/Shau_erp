# 📘 cross-env — Guía Técnica Completa (Documentación Oficial del Proyecto)

## 🧩 1. Introducción

El manejo de variables de entorno es una parte esencial en cualquier aplicación Node.js moderna. Estas variables permiten configurar:

- El entorno de ejecución (`NODE_ENV`)
- Conexiones a bases de datos
- Credenciales sensibles
- Puertos de escucha del servidor
- Flags de comportamiento en desarrollo o producción

Sin embargo, existe un problema fundamental:

### ⚠️ Windows **NO** interpreta la sintaxis estándar de variables que sí funciona en Linux y macOS.

Ejemplo que **funciona en Linux/macOS**, pero **falla en Windows**:

```bash
NODE_ENV=production node app.js
```

Windows requiere:

```bash
set NODE_ENV=production && node app.js
```

Este conflicto rompe scripts compartidos entre equipos, pipelines CI/CD y despliegues multicapa.

Aquí es donde entra **cross-env**.

---

## 🎯 2. ¿Qué es `cross-env`?

`cross-env` es una herramienta que permite establecer variables de entorno usando una sintaxis **única**, **simple** y **compatible en todos los sistemas operativos**.  
Permite definir variables dentro de scripts npm sin preocuparte del sistema operativo donde se ejecute.

### ✔ Garantiza compatibilidad total entre:
- Windows
- Linux
- macOS
- Contenedores Docker
- Pipelines CI/CD (GitHub Actions, GitLab CI, Jenkins, etc.)

Ejemplo universal:

```bash
cross-env NODE_ENV=production node app.js
```

Esto funciona EXACTAMENTE igual en todos los entornos.

---

## 📦 3. Instalación

```bash
npm install --save-dev cross-env
```

Recomendado como dependencia de desarrollo (`--save-dev`) porque solo se usa para scripts npm.

---

## ⚙️ 4. Uso básico

### ➤ Definir una variable de entorno

```bash
cross-env NODE_ENV=development node app.js
```

Dentro de tu aplicación, puedes leerla con:

```js
console.log(process.env.NODE_ENV); // "development"
```

---

## 📜 5. Uso en `package.json` (casos reales)

### Ejemplo típico de estructura profesional:

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development tsx watch src/index.ts",
    "build": "tsc && tsc-alias",
    "start": "cross-env NODE_ENV=production node dist/index.js",
    "test": "cross-env NODE_ENV=test jest"
  }
}
```

### Qué hace cada script:

| Script | Descripción |
|--------|-------------|
| **dev** | Ejecuta el servidor en modo desarrollo, sin compilar, con recarga automática |
| **build** | Compila TypeScript a JavaScript en `dist/` |
| **start** | Ejecuta la versión compilada en producción |
| **test** | Ejecuta pruebas con el entorno configurado como `test` |

---

## 🧠 6. ¿Por qué es necesario en proyectos profesionales?

### ✔ Para que los scripts funcionen igual en todos los entornos  
Si trabajas en un equipo, algunos usan Windows, otros macOS o Linux.

### ✔ Para que los pipelines CI/CD no fallen  
GitHub Actions usa Linux → Windows runner usa PowerShell.

### ✔ Para evitar errores inesperados como:

- `NODE_ENV no está definido`
- `process.env.NODE_ENV === undefined`
- Scripts que funcionan localmente pero fallan en el servidor
- Configuraciones de dotenv que no cargan correctamente en Windows

---

## 🧪 7. Ejemplos avanzados

### ➤ Múltiples variables de entorno

```json
"dev": "cross-env NODE_ENV=development API_URL=http://localhost:3000 tsx watch src/index.ts"
```

Acceso en código:

```ts
process.env.API_URL
```

---

### ➤ Con comandos encadenados

```json
"lint:fix": "cross-env NODE_ENV=dev eslint src --fix"
```

---

### ➤ Con frameworks

#### Express
```json
"start": "cross-env PORT=4000 node dist/server.js"
```

#### Sequelize
```json
"db:migrate": "cross-env NODE_ENV=development sequelize-cli db:migrate"
```

#### React / Vite
```json
"dev": "cross-env VITE_ENV=dev vite"
```

---

## 🚨 8. Errores comunes y soluciones

| Error | Causa | Solución |
|-------|--------|------------|
| `'NODE_ENV' no se reconoce` | Script sin `cross-env` en Windows | Usar `cross-env` |
| `spawn cross-env ENOENT` | No está instalado | Ejecutar `npm install --save-dev cross-env` |
| Variables no cargan | Script ejecuta mal el orden | Asegurarse de ejecutar `cross-env` antes del comando |
| dotenv carga valores incorrectos | `.env` no coincide con tu script | Revisar valores y cross-env en `package.json` |

---

## 🛡️ 9. Buenas prácticas recomendadas

✔ Definir *siempre* `NODE_ENV` en scripts clave  
✔ Mantener valores consistentes entre `.env` y `cross-env`  
✔ Nunca mezclar sintaxis nativa Windows con Linux (rompe compatibilidad)  
✔ Usar `cross-env-shell` si necesitas operadores avanzados (`&&`, `||`, pipes)  

Ejemplo:

```json
"script": "cross-env-shell "NODE_ENV=production && echo $NODE_ENV""
```

---

## 📚 10. Recursos oficiales

- Documentación oficial: https://github.com/kentcdodds/cross-env
- Buenas prácticas de variables de entorno: https://12factor.net/config

---

## 🏁 11. Conclusión

`cross-env` es una herramienta esencial para cualquier proyecto Node.js serio, especialmente en equipos multiplataforma.  
Garantiza que las variables de entorno funcionen igual en:

- Desarrollo
- Producción
- CI/CD
- Windows, Linux y macOS

Integrarlo en tus scripts asegura estabilidad, previsibilidad y evita errores silenciosos difíciles de depurar.