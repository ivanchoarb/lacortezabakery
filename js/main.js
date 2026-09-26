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
  const fotos = gsap.utils.toArray(".foto-flotante");
  const sello = document.querySelector(".sello-logo");

  gsap.set(palabras, { autoAlpha: 0, y: "0.6em" });
  gsap.set(items, { autoAlpha: 0, y: 18 });
  fotos.forEach((f) => {
    const rot = parseFloat(f.dataset.rot || 0);
    gsap.set(f, { autoAlpha: 0, y: 60, scale: 0.85, rotate: rot * 2.4 });
  });
  gsap.set(sello, { autoAlpha: 0, scale: 0.5, rotate: -40 });

  const entrada = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
  entrada
    .to(palabras, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.035 })
    .to(items, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.35")
    .to(
      fotos,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotate: (i, t) => parseFloat(t.dataset.rot || 0),
        duration: 0.85,
        stagger: 0.12,
        ease: "back.out(1.4)",
      },
      "-=0.5"
    )
    .to(
      sello,
      { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.7, ease: "back.out(2)" },
      "-=0.55"
    );

  // Parallax por capas al salir del hero: cada foto viaja a su propia velocidad.
  fotos.concat(sello).forEach((f) => {
    const vel = parseFloat(f.dataset.parallax || 0.6);
    gsap.to(f, {
      yPercent: -18 * vel,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.6 },
    });
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
