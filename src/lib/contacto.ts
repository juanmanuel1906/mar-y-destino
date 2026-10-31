import sitio from '../data/sitio.json';

export const numeroWhatsapp = sitio.whatsapp.replace(/\D/g, '');

// Botón flotante: usa el valor tal cual para que se vea aunque el número aún sea provisional.
export const enlaceBotonWhatsapp = `https://wa.me/${encodeURIComponent(sitio.whatsapp.trim())}?text=${encodeURIComponent('Hola, quiero planear un viaje.')}`;

export function enlaceWhatsapp(mensaje: string) {
  return `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Sin WhatsApp configurado, los botones llevan al formulario para no romper el enlace.
export function enlaceCotizar(destino?: string) {
  if (numeroWhatsapp) {
    return enlaceWhatsapp(
      destino
        ? `Hola, quiero información para viajar a ${destino}.`
        : 'Hola, quiero planear un viaje.',
    );
  }
  return destino ? `/?destino=${encodeURIComponent(destino)}#contacto` : '/#contacto';
}
