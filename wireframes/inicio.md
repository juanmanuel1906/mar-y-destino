# Wireframe: página de inicio

Estructura y movimiento, sin diseño visual. Sirve para pedir cambios por sección.

```
A. PORTADA (pantalla completa)
┌──────────────────────────────────────────────┐
│ [logo]              enlaces        [Cotizar] │  barra flotante: se oculta al bajar
│                           ✈ - - - - - - - -  │  avión: vuela en arco, sigue con el scroll
│            - - - - - -                       │
│ TU MUNDO,                    ┌─ pase ──────┐ │  título: sube palabra por palabra
│ nuestro destino.             │ ADZ  precio │ │  pase: flota con leve inclinación
│ [Ver planes]  texto          └─────────────┘ │
│ ~~~~~~~~~~~~~~ olas animadas ~~~~~~~~~~~~~~~ │
└──────────────────────────────────────────────┘

B. CINTA INCLINADA
  VUELOS ✦ HOTELES ✦ TOURS ✦ TRASLADOS ✦ ASISTENCIA   → reacciona a la velocidad del scroll

C. PLANES (sección fija, scroll horizontal; en móvil, deslizar con el dedo)
┌────────────┬───────────┬───────────┬──────────┐
│ título     │ pase 1    │ pase 2    │ ... otro │  códigos giran como tablero de aeropuerto
│ y texto    │ foto      │ foto      │ destino  │  fotos con parallax interno
│            │ ADZ ·  $  │ MAD ·  $  │          │
└────────────┴───────────┴───────────┴──────────┘

D. SERVICIOS (mosaico asimétrico)
┌───────────────┬───────┬───────┐
│ Vuelos        │Hoteles│ Tours │  entran escalonados
├───────┬───────┴───────┴───────┤
│Traslad│ Asistencia            │
└───────┴───────────────────────┘

E. RUTA (cuatro paradas)
  ✈ - - - ~ - - - ~ - - - ~ - - -   la línea se dibuja y el avión avanza con el scroll
  (1)      (2)      (3)      (4)

F. QUIÉNES SOMOS
  FRASE GRANDE que se ilumina palabra por palabra con el scroll
  [punto] [punto] [punto] [punto]

G. TESTIMONIOS (solo si hay)

H. PREGUNTAS: título | acordeón animado

I. CONTACTO (atardecer con olas arriba)
  ¿A DÓNDE VAMOS? | formulario

J. PIE: datos y nombre gigante
```
