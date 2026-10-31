import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const $ = (selector, raiz = document) => raiz.querySelector(selector);
const $$ = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];
const conMovimiento = matchMedia('(prefers-reduced-motion: no-preference)').matches;

// La barra funciona siempre; el resto solo si la persona no pidió reducir el movimiento.
function barra() {
  const elemento = $('[data-barra]');
  let anterior = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    elemento.classList.toggle('solida', y > 60);
    elemento.classList.toggle('oculta', y > anterior && y > 400);
    anterior = y;
  }, { passive: true });
}

function scrollSuave() {
  const lenis = new Lenis({ anchors: { offset: -70 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tiempo) => lenis.raf(tiempo * 1000));
  gsap.ticker.lagSmoothing(0);
}

function progreso() {
  gsap.to('[data-progreso]', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
  });
}

function entradaPortada() {
  const titulos = $$('[data-titulo]');
  if (!titulos.length) return;
  const linea = gsap.timeline({ defaults: { ease: 'expo.out' } });
  linea
    .from('[data-portada-foto] img', { scale: 1.18, duration: 2.2 }, 0)
    .from(titulos, { yPercent: 115, rotate: 3, duration: 1.3, stagger: 0.14 }, 0.15)
    .from('[data-entra]', { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.55)
    .from('[data-flota]', { y: 60, rotate: 10, autoAlpha: 0, duration: 1.2 }, 0.8);

  gsap.to('[data-portada-foto]', {
    yPercent: 16,
    ease: 'none',
    scrollTrigger: { trigger: '[data-portada]', start: 'top top', end: 'bottom top', scrub: true },
  });
}

function vueloPortada() {
  const avion = $('#avion');
  const trazo = $('#trazo-vuelo');
  if (!avion) return;
  const largo = trazo.getTotalLength();
  gsap.set(trazo, { strokeDasharray: largo, strokeDashoffset: largo });
  const estado = { avance: 0 };
  const volar = () => {
    gsap.set(trazo, { strokeDashoffset: largo * (1 - estado.avance) });
    gsap.set(avion, {
      motionPath: { path: trazo, align: trazo, alignOrigin: [0.5, 0.5], autoRotate: true, start: estado.avance, end: estado.avance },
    });
  };
  gsap.to(estado, {
    avance: 0.62,
    duration: 3,
    delay: 0.5,
    ease: 'power2.inOut',
    onUpdate: volar,
    onComplete() {
      gsap.to(estado, {
        avance: 1,
        ease: 'none',
        onUpdate: volar,
        scrollTrigger: { trigger: '[data-portada]', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    },
  });
  volar();
  gsap.to('[data-flota]', { y: -14, rotate: -2, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 });
}

function cinta() {
  const pista = $('[data-cinta]');
  if (!pista) return;
  const giro = gsap.to(pista, { xPercent: -25, duration: 24, ease: 'none', repeat: -1 });
  let apagar;
  ScrollTrigger.create({
    onUpdate(instancia) {
      const velocidad = instancia.getVelocity() / 300;
      giro.timeScale(gsap.utils.clamp(-5, 5, 1 + velocidad));
      gsap.to(pista, { skewX: gsap.utils.clamp(-8, 8, -velocidad), duration: 0.3, overwrite: 'auto' });
      clearTimeout(apagar);
      apagar = setTimeout(() => {
        gsap.to(giro, { timeScale: 1, duration: 0.6 });
        gsap.to(pista, { skewX: 0, duration: 0.6, overwrite: 'auto' });
      }, 120);
    },
  });
}

// Letras que giran como un tablero de aeropuerto hasta caer en el código real.
function girarCodigo(elemento) {
  const final = elemento.dataset.flap;
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const estado = { avance: 0 };
  gsap.to(estado, {
    avance: 1,
    duration: 1.1,
    ease: 'power1.out',
    onUpdate() {
      const fijas = Math.floor(estado.avance * final.length);
      elemento.textContent = [...final]
        .map((letra, i) => (i < fijas ? letra : letras[Math.floor(Math.random() * letras.length)]))
        .join('');
    },
    onComplete() {
      elemento.textContent = final;
    },
  });
}

function planes(medios) {
  const seccion = $('[data-planes]');
  if (!seccion) return;
  const pista = $('[data-pista]');
  const pases = $$('[data-pase]', pista);

  medios.add('(min-width: 60rem)', () => {
    seccion.classList.add('fijada');
    const distancia = () => pista.scrollWidth - innerWidth;
    const recorrido = gsap.to(pista, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: seccion,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => `+=${distancia()}`,
        invalidateOnRefresh: true,
      },
    });
    pases.forEach((pase) => {
      gsap.from(pase, {
        y: 70,
        rotate: 3,
        ease: 'power2.out',
        scrollTrigger: { trigger: pase, containerAnimation: recorrido, start: 'left 100%', end: 'left 65%', scrub: true },
      });
      const foto = $('[data-foto-pase]', pase);
      if (foto) {
        gsap.fromTo(foto, { xPercent: -7 }, {
          xPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: pase, containerAnimation: recorrido, start: 'left right', end: 'right left', scrub: true },
        });
      }
      const codigo = $('[data-flap]', pase);
      if (codigo) {
        ScrollTrigger.create({
          trigger: pase,
          containerAnimation: recorrido,
          start: 'left 80%',
          onEnter: () => girarCodigo(codigo),
        });
      }
    });
    return () => seccion.classList.remove('fijada');
  });

  medios.add('(max-width: 59.99rem)', () => {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const codigo = $('[data-flap]', entrada.target);
        if (codigo) girarCodigo(codigo);
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.5 });
    pases.forEach((pase) => observador.observe(pase));
    return () => observador.disconnect();
  });
}

function ruta(medios) {
  const avion = $('#avion-ruta');
  if (!avion) return;
  const trazo = $('#trazo-ruta');
  const largo = trazo.getTotalLength();
  medios.add('(min-width: 60rem)', () => {
    gsap.set(trazo, { strokeDasharray: largo, strokeDashoffset: largo });
    const estado = { avance: 0 };
    gsap.to(estado, {
      avance: 1,
      ease: 'none',
      onUpdate() {
        gsap.set(trazo, { strokeDashoffset: largo * (1 - estado.avance) });
        gsap.set(avion, {
          motionPath: { path: trazo, align: trazo, alignOrigin: [0.5, 0.5], autoRotate: true, start: estado.avance, end: estado.avance },
        });
      },
      scrollTrigger: { trigger: '[data-proceso]', start: 'top 55%', end: 'bottom 75%', scrub: 0.6 },
    });
  });
}

function frase() {
  const elemento = $('[data-frase]');
  if (!elemento) return;
  const palabras = elemento.textContent.trim().split(/\s+/);
  elemento.setAttribute('aria-label', elemento.textContent.trim());
  elemento.innerHTML = palabras.map((p) => `<span aria-hidden="true">${p}</span>`).join(' ');
  gsap.from($$('span', elemento), {
    opacity: 0.14,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: elemento, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 },
  });
}

function revelados() {
  $$('[data-sube]').forEach((elemento) => {
    gsap.from(elemento, {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: elemento, start: 'top 88%', once: true },
    });
  });
  $$('[data-grupo]').forEach((grupo) => {
    gsap.from(grupo.children, {
      y: 50,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: grupo, start: 'top 85%', once: true },
    });
  });
  $$('.ficha [data-flap]').forEach(girarCodigo);
}

function pieGigante() {
  const elemento = $('[data-pie-gigante]');
  gsap.from(elemento, {
    yPercent: 45,
    ease: 'none',
    scrollTrigger: { trigger: elemento, start: 'top bottom', end: 'bottom bottom', scrub: true },
  });
}

function imanes() {
  if (!matchMedia('(hover: hover)').matches) return;
  $$('[data-iman]').forEach((boton) => {
    const x = gsap.quickTo(boton, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(boton, 'y', { duration: 0.5, ease: 'power3.out' });
    boton.addEventListener('pointermove', (evento) => {
      const caja = boton.getBoundingClientRect();
      x((evento.clientX - caja.left - caja.width / 2) * 0.3);
      y((evento.clientY - caja.top - caja.height / 2) * 0.4);
    });
    boton.addEventListener('pointerleave', () => {
      x(0);
      y(0);
    });
  });
  // Los pases se inclinan siguiendo el cursor.
  $$('a[data-pase], .mosaico li').forEach((tarjeta) => {
    tarjeta.addEventListener('pointermove', (evento) => {
      const caja = tarjeta.getBoundingClientRect();
      gsap.to(tarjeta, {
        rotateY: ((evento.clientX - caja.left) / caja.width - 0.5) * 7,
        rotateX: ((evento.clientY - caja.top) / caja.height - 0.5) * -7,
        transformPerspective: 900,
        duration: 0.5,
        overwrite: 'auto',
      });
    });
    tarjeta.addEventListener('pointerleave', () => {
      gsap.to(tarjeta, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
    });
  });
}

barra();

if (conMovimiento) {
  const medios = gsap.matchMedia();
  scrollSuave();
  progreso();
  entradaPortada();
  vueloPortada();
  cinta();
  planes(medios);
  ruta(medios);
  frase();
  revelados();
  pieGigante();
  imanes();
  addEventListener('load', () => ScrollTrigger.refresh());
}
