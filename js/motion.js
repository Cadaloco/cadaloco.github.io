(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !document.body.hasAttribute("data-animate")) return;

  let lastY = window.scrollY;
  let dir = "down";

  function scrollDir() {
    const y = window.scrollY;
    if (y !== lastY) dir = y > lastY ? "down" : "up";
    return dir;
  }

  window.addEventListener("scroll", () => {
    scrollDir();
    lastY = window.scrollY;
  }, { passive: true });

  const view = { rootMargin: "0px 0px -6% 0px", threshold: [0, 0.08, 0.15, 0.28, 0.45, 0.6, 0.75, 0.9, 1] };

  function attach(el, show, hide, openNow, keep) {
    let open = openNow;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (keep) {
          if (entry.isIntersecting) show();
          return;
        }
        const up = scrollDir() === "up";
        const box = entry.boundingClientRect;
        const vh = window.innerHeight;
        const docTop = box.top + window.scrollY;
        const onOpening = window.scrollY < 32 && docTop < vh;
        if (onOpening && entry.isIntersecting) {
          if (open) show();
          return;
        }
        const visibleHeight = Math.min(box.bottom, vh) - Math.max(box.top, 0);
        const stillOnScreen = visibleHeight > Math.min(box.height, vh) * 0.28;
        const leavingDownward = up && box.top > vh * 0.46 && box.top < vh && box.bottom > vh * 0.88 && stillOnScreen;
        if (leavingDownward) {
          open = true;
          hide();
          return;
        }
        if (open && !up && entry.intersectionRatio >= 0.12) show();
      });
    }, keep ? { threshold: [0, 0.01, 1] } : view);
    observer.observe(el);
    return () => {
      open = true;
    };
  }

  function play(el, className, keep) {
    const show = () => el.classList.add(className);
    const hide = () => el.classList.remove(className);
    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight * 0.86 && rect.bottom > 0;
    if (!onScreen) {
      attach(el, show, hide, true, keep);
      return;
    }
    const release = attach(el, show, hide, false, keep);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        show();
        release();
      });
    });
  }

  function copyBlock(el, selector, keep, start) {
    if (!el) return;
    el.classList.add("motion-copy");
    const nodes = selector ? [...el.querySelectorAll(selector)] : [...el.children];
    nodes.forEach((node, index) => {
      node.classList.add("rise");
      node.style.setProperty("--rise-i", String(index + (start || 0)));
    });
    play(el, "is-in", keep);
  }

  function each(selector) {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.style.setProperty("--rise-i", String(index % 4));
      play(el, "is-shown");
    });
  }

  copyBlock(document.querySelector(".hero-copy"), ":scope > p, :scope > .btn", false, 8);
  const hero = document.querySelector(".home-hero");
  if (hero) play(hero, "is-in");
  copyBlock(document.querySelector(".port-head"), ":scope > div > *, :scope > .port-copy");
  each(".orbit");
  copyBlock(document.querySelector(".wave-copy"));
  copyBlock(document.querySelector(".historia .wrap > div:first-child"));
  each(".shot-land, .shot-man");
  copyBlock(document.querySelector(".origin-card"));
  copyBlock(document.querySelector(".regalos-home .wrap > div:first-child"));
  each(".gift-frame");
  copyBlock(document.querySelector(".footer-row"), null, true);
  copyBlock(document.querySelector(".house-top > div:first-child"));
  each(".house-still img");
  copyBlock(document.querySelector(".gifts-hero .wrap"));
  copyBlock(document.querySelector(".supply-hero .wrap"));
  copyBlock(document.querySelector(".meet-hero .wrap"));
  copyBlock(document.querySelector(".quote-hero .wrap"));
  document.querySelectorAll(".gift-head, .supply-notes, .supply-cta, .meet-cta").forEach((el) => copyBlock(el));
  each(".offer, .line-card, .station, .values li, .pack-row figure, .made-grid img, .pretext, .scale, .supply-board, .quote-card, .quote-notes, .use-row > li");
  copyBlock(document.querySelector(".quote-form"));
})();
