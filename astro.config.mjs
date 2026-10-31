import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sitio from './src/data/sitio.json' with { type: 'json' };

// En local, abre el panel en /admin/ igual que en el sitio publicado.
const panelEnAdmin = {
  name: 'panel-en-admin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const [ruta, consulta] = req.url.split('?');
      if (ruta === '/admin') {
        res.writeHead(301, { Location: `/admin/${consulta ? `?${consulta}` : ''}` });
        res.end();
        return;
      }
      if (ruta === '/admin/') req.url = '/admin/index.html';
      next();
    });
  },
};

// La dirección del sitio se edita en el panel: Ajustes > Datos de la agencia.
export default defineConfig({
  site: sitio.url || undefined,
  integrations: sitio.url ? [sitemap()] : [],
  vite: { plugins: [panelEnAdmin] },
});
