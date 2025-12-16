# 🧹 rimraf — La herramienta estándar para eliminar carpetas en proyectos Node.js de forma multiplataforma

Cuando trabajamos en entornos Node.js, especialmente con TypeScript o procesos de build, una de las tareas más comunes es **eliminar directorios generados automáticamente**, como:

- `dist/`
- `.cache/`
- `.tmp/`

En sistemas Unix (Linux y macOS) este problema no existe, porque el comando:

```sh
rm -rf dist
```

existe por defecto.  
Pero en **Windows**, este comando **no existe**, lo que genera errores en los scripts de limpieza dentro del `package.json`.

Aquí es donde entra **rimraf**, una de las herramientas más usadas y confiables del ecosistema Node.js.

---

## 🌐 ¿Qué es rimraf?

`rimraf` es una utilidad que elimina archivos y directorios de manera recursiva, imitando el comportamiento del comando Unix:

```sh
rm -rf
```

Pero con una diferencia clave:

> **Funciona exactamente igual en Windows, Linux y macOS.**

Fue creada inicialmente para resolver problemas de permisos con `node_modules`, pero terminó convirtiéndose en un estándar de facto para limpiar carpetas en entornos de build.

---

## ⚙️ Instalación

```sh
npm install --save-dev rimraf
```

Esto permite usarlo como parte de los scripts de `package.json`.

---

## 🧾 Uso en package.json

Ejemplo típico:

```json
{
  "scripts": {
    "clean": "rimraf dist"
  }
}
```

Funciona en:

- PowerShell  
- CMD  
- Git Bash  
- WSL  
- macOS Terminal  
- Linux Terminal  

Sin cambiar una sola línea.

---

## 🧠 ¿Por qué no usar `rm -rf` directamente?

Porque su disponibilidad depende del sistema operativo:

| Entorno | ¿Funciona `rm -rf`? |
|--------|----------------------|
| Linux | ✔️ |
| macOS | ✔️ |
| Git Bash (Windows) | ✔️ |
| PowerShell | ❌ |
| CMD | ❌ |
| npm scripts en Windows | ❌ |

Si trabajas en un equipo mixto o tienes procesos de CI/CD que corren en distintos entornos, usar `rm -rf` es una fuente común de errores.

---

## 🛠️ Beneficios de rimraf

### ✔️ Compatibilidad total

Funciona en todos los sistemas operativos uniformemente.

### ✔️ Sintaxis simple

```sh
rimraf dist logs temp
```

### ✔️ Confiable

Evita problemas de permisos en Windows o rutas largas.

### ✔️ Standard del ecosistema

Usado por herramientas como:

- Angular CLI  
- NestJS  
- React Native tools  
- Vite plugins  
- Webpack scripts  

---

## 🆚 ¿Por qué no usar `fs.rmSync`?

Node permite eliminar directorios desde CLI usando:

```sh
node -e "require('fs').rmSync('dist', { recursive: true, force: true })"
```

Pero esta alternativa:

- es menos legible  
- es frágil por las comillas  
- no permite borrar múltiples carpetas fácilmente  
- es menos estándar  
- no funciona en versiones antiguas de Node  

Por eso la comunidad sigue prefiriendo **rimraf**.

---

## 🚀 Flujo de build profesional usando rimraf

```json
{
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm run clean && tsc && tsc-alias",
    "start": "node dist/index.js"
  }
}
```

Garantiza que:

1. La carpeta `dist/` se limpia correctamente  
2. El build se genera sin residuos  
3. Los alias se reescriben correctamente  
4. Node puede ejecutar el proyecto sin problemas  

---

## 📌 Conclusión

`rimraf` no es un reemplazo simple de `rm -rf`; es una herramienta **multiplataforma, segura y estándar** que permite borrar directorios de manera confiable en proyectos Node.js.

Si tu proyecto:

- genera artefactos (`dist/`, `.cache/`)  
- usa TypeScript  
- compila antes de ejecutar  
- se ejecuta en Windows o CI/CD  

Entonces **rimraf es la opción correcta**.

