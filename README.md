# Rafa Castro — Portafolio web (v0.3)

Sitio funcional y editable en **Astro + CSS + GSAP**, preparado para trabajar en **Visual Studio Code**.
Estética editorial, composición experimental, acento naranja terracota y textos en español.

## Cómo abrirlo en Visual Studio Code

1. Descarga y descomprime el ZIP.
2. En Visual Studio Code, selecciona **Archivo > Abrir carpeta** y abre `rafa-castro-portfolio`.
3. Abre **Terminal > Nuevo terminal**.
4. Necesitas **Node.js 22.12 o posterior** para Astro 6 (comprueba con `node -v`).
5. Ejecuta:
   ```bash
   npm install
   npm run dev
   ```
6. Abre el enlace local que aparece en la terminal, generalmente **http://localhost:4321/**.

**Importante:** Esta web no se abre haciendo doble clic en `index.astro` ni utilizando Live Server: Astro utiliza su propio servidor de desarrollo.

## Mapa de archivos

- `src/pages/index.astro`: portada, galería, Sobre mí y contacto.
- `src/pages/work/[slug].astro`: página independiente de cada proyecto.
- `src/data/projects.js`: títulos, categorías, textos y estado de los proyectos.
- `src/data/site.js`: nombre y **correo**, que está vacío hasta que lo añadas.
- `src/styles/global.css`: paleta, tipografías, diseño responsive y efectos visuales.
- `src/scripts/interactions.js`: filtros de proyectos y animaciones GSAP.
- `src/scripts/site.js`: menú móvil.
- `src/components/CoverArt.astro`: **portadas DEMO**, no resultados reales.

## Cómo poner tu correo electrónico

Abre `src/data/site.js` y sustituye:
```js
email: '',
```
por:
```js
email: 'tu-correo-real@dominio.com',
```
Mientras el campo esté vacío, se verá el aviso "Correo pendiente de configurar". No hay direcciones inventadas ni envío de datos a servidores.

## Tipografías: Arsenica Antiqua + Codec Pro

Se eligió la variante **Normal / Regular (peso 400)** para ambas familias.
Las fuentes NO se incluyen porque requieren permiso de uso y redistribución.

Si tienes webfonts licenciadas, colócalas en `public/fonts/` con estos nombres:
- `ArsenicaAntiqua-Regular.woff2`
- `CodecPro-Regular.woff2`

Después abre `src/styles/global.css` y elimina los delimitadores `/*` y `*/` que rodean las dos reglas `@font-face` del inicio.
Sin esas fuentes, el prototipo usa Georgia y Arial o alternativas del sistema. No será una vista idéntica al resultado definitivo.

## Preparar y publicar

- Sustituir portadas ilustrativas por tus trabajos reales.
- Agregar foto profesional a la sección Sobre mí.
- Incorporar videos reales y casos de estudio ampliados.
- Confirmar los datos sobre cada proyecto y su estado.
- Agregar tu dirección de correo.
- Probar legibilidad, dispositivos móviles y animaciones.

Para generar una versión estática lista para hosting:
```bash
npm run build
```
El resultado se guarda en `dist/`. Puede alojarse en proveedores compatibles con Astro como Netlify o Vercel.

**Accesibilidad:** navegación por teclado, filtros con `aria-pressed`, soporte de `prefers-reduced-motion`, menús adaptables y alternativas sin autoplay.


## Mejoras de movimiento v0.3

- Entrada del título principal por líneas, con máscaras y secuenciación.
- Aparición progresiva de las secciones al desplazarse.
- Tarjetas con efecto de elevación suave y filtros animados.
- Parallax discreto en el póster principal y en la portada de cada proyecto (escritorio).
- Transiciones entre tarjetas y páginas de proyectos con Astro ClientRouter.
- Interacciones magnéticas suaves en los botones, solo con mouse.
- Todos los efectos se omiten o minimizan si el sistema solicita movimiento reducido.

### Actualizar desde v0.1

Cierra el servidor local con `Ctrl+C`. Copia la carpeta completa o solo los archivos indicados en la actualización parcial; conserva una copia de tus modificaciones.
En VS Code, ejecuta `npm.cmd run dev` (sin `npm install` porque no agregamos dependencias).

Si no observas el cambio, recarga el navegador con `Ctrl+F5`.


## Actualización 0.3 — aparecer al hacer scroll y botones con hover suave

- Al bajar, títulos, filtros, tarjetas, servicios, contacto y elementos de cada caso aparecen desde 76px abajo, con desenfoque decreciente y duración aproximada de 1.2 segundos.
- Los botones principales se elevan ligeramente, aumentan de tamaño, muestran un reflejo y deslizan su flecha. Los filtros se vuelven terracota al pasar el cursor.
- Usa `IntersectionObserver` nativo para los efectos al hacer scroll; funciona sin nuevas dependencias.
- Reaplica observadores al navegar entre proyectos con Astro. Respeta `prefers-reduced-motion`.

### Aplicar solo el parche

1. Haz una copia de tu carpeta actual `rafa-castro-portfolio`.
2. Descomprime `Rafa_Castro_Movimiento_v03_PARCHE.zip` en una carpeta temporal.
3. Copia el contenido de `src/` sobre la carpeta `src/` del proyecto existente. Los dos archivos reemplazados son `src/scripts/interactions.js` y `src/styles/global.css`.
4. Si Astro estaba abierto, reinícialo con `npm.cmd run dev`. Refresca en el navegador con `Ctrl + F5`.
5. En la consola del navegador (F12) puedes verificar la cadena `[Rafa Castro] Motion v0.3 activo`.

Si los movimientos no aparecen, revisa si el sistema tiene activada la preferencia de **reducir movimiento**. No fuerces animaciones si tú o un visitante prefieren reducirlas.
