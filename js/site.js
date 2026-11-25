const alignOriginCard = () => {
  const photo = document.querySelector(".shot-man");
  const card = document.querySelector(".origin-card");
  if (!photo || !card) return;
  if (getComputedStyle(card).position !== "absolute") {
    card.style.right = "";
    card.style.removeProperty("--origin-right");
    return;
  }
  const inset = document.documentElement.clientWidth - photo.getBoundingClientRect().right;
  card.style.right = `${inset}px`;
  card.style.setProperty("--origin-right", `${inset}px`);
};

alignOriginCard();
window.addEventListener("resize", alignOriginCard);

const clipHandToWave = () => {
  const wave = document.querySelector(".wave");
  const hand = document.querySelector(".hand");
  if (!wave || !hand) return;
  const waveBox = wave.getBoundingClientRect();
  const handBox = hand.getBoundingClientRect();
  const strip = waveBox.width * (126.807 / 1920);
  const above = waveBox.bottom - strip - handBox.top;
  const x = waveBox.left - handBox.left;
  const size = `${waveBox.width}px ${Math.max(above, 0)}px, ${waveBox.width}px ${strip}px`;
  const position = `${x}px 0px, ${x}px ${Math.max(above, 0)}px`;
  hand.style.webkitMaskSize = size;
  hand.style.maskSize = size;
  hand.style.webkitMaskPosition = position;
  hand.style.maskPosition = position;
};

clipHandToWave();
window.addEventListener("resize", clipHandToWave);

const header = document.querySelector(".site-header");
if (header && document.body.classList.contains("home")) {
  const paintHeader = () => header.classList.toggle("is-solid", window.scrollY > 8);
  paintHeader();
  window.addEventListener("scroll", paintHeader, { passive: true });
}

const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const form = document.querySelector("[data-order]");
if (form) {
  const params = new URLSearchParams(window.location.search);
  const line = params.get("linea");
  const lineField = form.querySelector("[name=linea]");
  if (line && lineField) lineField.value = line;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const who = data.get("contacto") === "daniel" ? "573102565789" : "573138527043";
    const org = data.get("organizacion");
    const lines = [
      org ? `Hola, soy ${data.get("nombre")} de ${org}.` : `Hola, soy ${data.get("nombre")}.`,
      `Quiero cotizar: ${data.get("linea")}.`,
      data.get("cantidad") ? `Cantidad: ${data.get("cantidad")}.` : "",
      data.get("ciudad") ? `Ciudad de entrega: ${data.get("ciudad")}.` : "",
      data.get("mensaje"),
    ].filter(Boolean);
    window.location.href = `https://wa.me/${who}?text=${encodeURIComponent(lines.join("\n"))}`;
  });
}
