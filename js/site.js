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

function addWhatsappFloat() {
  const link = document.createElement("a");
  link.className = "wa-float";
  link.href = "https://api.whatsapp.com/send?phone=573138527043&text=" + encodeURIComponent("Hola, quiero cotizar con Cada Loco con su Tema.");
  link.setAttribute("aria-label", "Hablar por WhatsApp");
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.92c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.88-1.25-4.76-4.15-4.9-4.35-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39.86-.39h.62c.2 0 .46-.07.72.55.27.64.91 2.22.99 2.38.08.16.13.35.03.56-.1.21-.15.34-.3.52-.15.18-.31.4-.44.54-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.65-.07.18-.2.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.49.22.56.34.08.12.08.7-.16 1.38Z"/></svg>';
  document.body.append(link);
}

addWhatsappFloat();
