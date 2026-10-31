import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const destinos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/destinos' }),
  schema: z.object({
    nombre: z.string(),
    region: z.string(),
    codigo: z.string().nullish(),
    coordenadas: z.string().nullish(),
    resumen: z.string(),
    imagen: z.string(),
    imagenAlt: z.string(),
    credito: z.string().nullish(),
    precio: z.string().nullish(),
    duracion: z.string().nullish(),
    idealPara: z.string().nullish(),
    experiencias: z.array(z.string()).nullish(),
    incluye: z.array(z.string()).nullish(),
    orden: z.number().default(99),
    publicado: z.boolean().default(true),
  }),
});

const testimonios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/testimonios' }),
  schema: z.object({
    nombre: z.string(),
    viaje: z.string().nullish(),
    texto: z.string(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { destinos, testimonios };
