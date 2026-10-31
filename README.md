# Mar & Destino

Sitio web de la agencia de viajes Mar & Destino. Hecho con [Astro](https://astro.build) (sitio estático), [GSAP](https://gsap.com) y [Lenis](https://lenis.darkroom.engineering) para las animaciones, y [Decap CMS](https://decapcms.org) (panel de edición en `/admin`).

Requiere Node 22.12 o superior.

```bash
npm install
npm run editar   # sitio en localhost:4321 y panel en localhost:4321/admin/
npm run dev      # solo el sitio
npm run build    # genera el sitio final en dist/
```

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Datos de la agencia | `src/data/sitio.json` |
| Textos de la página de inicio | `src/data/inicio.json` |
| Destinos y testimonios | `src/content/` |
| Fotos | `public/imagenes/` |
| Campos del panel | `public/admin/config.yml` |
| Colores y fuentes | inicio de `src/styles/global.css` |

Al agregar un campo, actualiza también `src/content.config.ts` (si es de una colección) y `public/admin/config.yml`.

## Publicar y activar el panel en línea

El panel guarda los cambios como commits en GitHub, y el hosting reconstruye el sitio con cada uno. Por eso, en línea, quien edita necesita una cuenta de GitHub con acceso al repositorio.

1. Sube el proyecto a un repositorio de GitHub, idealmente en una cuenta de la agencia.
2. En `public/admin/config.yml`, cambia `repo: TU-USUARIO/mar-y-destino` por el repositorio real.
3. Crea el sitio en Netlify desde ese repositorio. Detecta Astro; el comando es `npm run build` y la carpeta, `dist`.
4. En GitHub, crea una OAuth App (Settings > Developer settings) con el callback `https://api.netlify.com/auth/done`.
5. En Netlify, agrega esa app como proveedor de GitHub en la sección de OAuth del sitio.
6. Entra a `https://tu-dominio/admin/` e inicia sesión con GitHub.
7. Escribe la dirección web en el panel (Ajustes > Datos de la agencia). Activa la URL canónica, la imagen para redes y el sitemap.

Los pasos 3 a 6 no se han probado todavía contra un sitio real: compruébalos en la primera publicación.

## Antes de entregar

- [ ] Logo original en alta resolución. El actual (`public/imagenes/logo.png`) está recortado de una captura de Instagram.
- [ ] Confirmar precios, moneda y condiciones de San Andrés y España, tomados de sus publicaciones de Instagram.
- [ ] Confirmar qué significa "Travel Mayorista" para el sitio: si también venden a otras agencias, falta una sección para ellas.
- [ ] WhatsApp y correo reales. **Sin ellos, el formulario de contacto queda inactivo y muestra un aviso.**
- [ ] Revisar con la agencia todos los textos, destinos y promesas de "Quiénes somos" y "Preguntas frecuentes".
- [ ] Número de RNT y avisos legales que exija la normativa de turismo y de datos personales de su país.
- [ ] Redes sociales y dirección web.
- [ ] Reemplazar las fotos de muestra por propias, si las hay. Las actuales tienen licencia libre que exige atribución (ver `/creditos`, se actualiza solo con los créditos de cada foto). Las CC BY-SA son las de Cartagena y Tayrona.

## Origen de las fotos de muestra

Todas provienen de Wikimedia Commons:

- [Portada](https://commons.wikimedia.org/wiki/File:Playa_de_Johny_Cay.jpg) y [San Andrés](https://commons.wikimedia.org/wiki/File:Johny_Cay.jpg): Mario Carvajal, CC BY 3.0
- [Cartagena](https://commons.wikimedia.org/wiki/File:Sunset-cartagena-tower-dewired.jpg): Igvir Ramirez, CC BY-SA 2.0
- [Tayrona](https://commons.wikimedia.org/wiki/File:El_Cabo_at_Tayrona_National_Park.JPG): Uhkabu, CC BY-SA 3.0
- [Tulum](https://commons.wikimedia.org/wiki/File:Tulum_Mayan_Ruins_(213574099).jpeg): Dronepicr, CC BY 3.0
- [Madrid](https://commons.wikimedia.org/wiki/File:Calle_de_Alcal%C3%A1_(Madrid)_16.jpg): Fermín Rodríguez Fajardo, CC BY 2.0
- [Saona](https://commons.wikimedia.org/wiki/File:Saona_Island_Beach.jpg): Pierpunk, dominio público
- [Santorini](https://commons.wikimedia.org/wiki/File:Santorini,_Oia_(6244748504).jpg): Arian Zwegers, CC BY 2.0
