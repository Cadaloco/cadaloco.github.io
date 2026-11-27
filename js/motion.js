(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const reveal = (targets, { trigger, start = "top 84%", ...vars } = {}) => {
    const list = gsap.utils.toArray(targets);
    if (!list.length) return;
    gsap.from(list, {
      y: 32,
      autoAlpha: 0,
      duration: 0.85,
      ease: "power3.out",
      ...vars,
      scrollTrigger: {
        trigger: trigger || list[0],
        start,
        once: true,
      },
    });
  };

  document.querySelectorAll(".house-hero, .gifts-hero, .supply-hero, .meet-hero, .quote-hero").forEach((hero) => {
    gsap.from(hero.querySelectorAll(".eyebrow, h1, p"), {
      y: 28,
      autoAlpha: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.1,
    });
  });

  gsap.from(".house-still img", {
    y: 36,
    scale: 0.96,
    autoAlpha: 0,
    duration: 1.15,
    ease: "power3.out",
    transformOrigin: "50% 80%",
  });

  reveal(".port-head > *", { trigger: ".port-head", stagger: 0.12, y: 40, duration: 0.95 });

  gsap.from(".orbit", {
    y: 56,
    autoAlpha: 0,
    duration: 0.95,
    ease: "power3.out",
    stagger: 0.13,
    scrollTrigger: { trigger: ".orbits", start: "top 78%", once: true },
  });

  gsap.from(".orbit img", {
    scale: 0.9,
    duration: 1.1,
    ease: "power2.out",
    stagger: 0.13,
    transformOrigin: "center bottom",
    clearProps: "scale",
    scrollTrigger: { trigger: ".orbits", start: "top 78%", once: true },
  });

  gsap.from(".orbit .arch-go", {
    scale: 0.4,
    autoAlpha: 0,
    duration: 0.5,
    ease: "back.out(2.2)",
    stagger: 0.13,
    delay: 0.28,
    scrollTrigger: { trigger: ".orbits", start: "top 78%", once: true },
  });

  reveal(".wave-copy > *", { trigger: ".wave-copy", stagger: 0.1, y: 26 });

  reveal(".historia .wrap > div:first-child > *", {
    trigger: ".historia",
    stagger: 0.09,
    y: 36,
    duration: 0.9,
  });

  gsap.fromTo(
    ".shot-land",
    { y: 64, autoAlpha: 0, rotation: -8 },
    {
      y: 0,
      autoAlpha: 1,
      rotation: -2.5,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".collage", start: "top 80%", once: true },
    }
  );

  gsap.fromTo(
    ".shot-man",
    { y: 80, autoAlpha: 0, rotation: 10 },
    {
      y: 0,
      autoAlpha: 1,
      rotation: 4.5,
      duration: 1.05,
      delay: 0.18,
      ease: "power3.out",
      scrollTrigger: { trigger: ".collage", start: "top 80%", once: true },
    }
  );

  gsap.from(".stamp", {
    scale: 1.35,
    autoAlpha: 0,
    duration: 0.62,
    delay: 0.45,
    ease: "back.out(1.8)",
    transformOrigin: "center",
    scrollTrigger: { trigger: ".collage", start: "top 80%", once: true },
  });

  reveal(".origin-card > *", { trigger: ".origin-card", stagger: 0.09, y: 24, duration: 0.8 });

  reveal(".regalos-home .wrap > div:first-child > *", {
    trigger: ".regalos-home",
    stagger: 0.1,
    y: 30,
  });

  gsap.from(".gift-frame", {
    "--disk": 0.55,
    duration: 1.15,
    ease: "back.out(1.5)",
    scrollTrigger: { trigger: ".gift-frame", start: "top 82%", once: true },
  });

  gsap.from(".gift-frame img", {
    scale: 1.06,
    autoAlpha: 0,
    duration: 1.05,
    ease: "power3.out",
    transformOrigin: "68% 60%",
    clearProps: "scale",
    scrollTrigger: { trigger: ".gift-frame", start: "top 82%", once: true },
  });

  reveal(".footer-row > *", { trigger: ".site-footer", start: "top 96%", stagger: 0.06, y: 16, duration: 0.6 });

  [".offer", ".line-card", ".station", ".values li", ".sku", ".quote-card", ".quote-notes", ".pretext"].forEach(
    (selector) => {
      gsap.utils.toArray(selector).forEach((item) => {
        reveal(item, { y: 26, duration: 0.7 });
      });
    }
  );

  reveal(".made-grid img", {
    trigger: ".made-grid",
    stagger: 0.06,
    y: 22,
    duration: 0.65,
    scale: 0.97,
    clearProps: "scale",
  });
  reveal(".pack-row figure", { trigger: ".pack-row", stagger: 0.08, y: 24 });
  reveal(".quote-form > *", { trigger: ".quote-form", stagger: 0.05, y: 18, duration: 0.55 });
  reveal(".scale", { y: 20, duration: 0.7 });
  reveal(".supply-board", { y: 24, duration: 0.75 });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
