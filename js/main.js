document.getElementById("anio").textContent = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// Anclas del menú pasan por Lenis para que el smooth scroll no se rompa.
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  });
});

const mm = gsap.matchMedia();

// --- Hero dopamínico: solo con movimiento permitido ---
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const palabras = gsap.utils.toArray("[data-word]");
  const items = gsap.utils.toArray(".rev-item");
  const fondo = document.querySelector(".hero__fondo img");

  gsap.set(palabras, { autoAlpha: 0, y: "0.6em" });
  gsap.set(items, { autoAlpha: 0, y: 18 });
  gsap.set(fondo, { scale: 1.15 });

  const entrada = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
  entrada
    .to(fondo, { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
    .to(palabras, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.035 }, 0.2)
    .to(items, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.35");

  // Parallax: el fondo viaja más lento que el scroll al salir del hero.
  gsap.to(fondo, {
    yPercent: 12,
    scale: 1.06,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6 },
  });

  // Reveal del resto de la página, agrupado por sección.
  gsap.utils.toArray(".seccion").forEach((sec) => {
    const heading = sec.querySelectorAll("h2, .seccion__intro, .seccion__nota");
    if (heading.length) {
      gsap.set(heading, { autoAlpha: 0, y: 20 });
      ScrollTrigger.batch(heading, {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }),
      });
    }
  });

  const cards = gsap.utils.toArray(".rev");
  gsap.set(cards, { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch(cards, {
    start: "top 90%",
    once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
  });
});
