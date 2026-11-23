// TEMAN homepage behaviour: part number / VIN field, messenger links, copy toast, rotating placeholder, mobile menu.
// The page works without this script: links open the chats, the field is a plain text input.
const WA_BASE = "https://wa.me/380669779947";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const input = document.querySelector<HTMLInputElement>("[data-part]");
const ticks = Array.from(document.querySelectorAll<HTMLElement>("[data-ticks] .vin__tick"));
const count = document.querySelector<HTMLElement>("[data-count]");
const vinBox = document.getElementById("part-vin");
const vinStatus = document.querySelector<HTMLElement>("[data-vin-status]");
const echoes = document.querySelectorAll<HTMLElement>("[data-echo]");
const waLinks = document.querySelectorAll<HTMLAnchorElement>("a[data-wa]");
const toast = document.querySelector<HTMLElement>("[data-toast]");

const VIN_HINT = vinStatus?.textContent ?? "";
const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;

const clean = (v: string) => v.trim().toUpperCase();
const compact = (v: string) => clean(v).replace(/[\s\-./]/g, "");

function update(): void {
  const raw = clean(input?.value ?? "");
  const code = compact(raw);
  const n = Math.min(code.length, 17);
  ticks.forEach((t, i) => t.classList.toggle("is-on", i < n));
  if (count) count.textContent = String(code.length);
  const isVin = VIN_RE.test(code);
  vinBox?.classList.toggle("is-vin", isVin);
  if (vinStatus) {
    const next = isVin ? "Схоже на VIN — надішліть його менеджеру" : code.length > 17 ? "Більше 17 символів — це номер деталі, не VIN" : VIN_HINT;
    if (vinStatus.textContent !== next) vinStatus.textContent = next;
  }
  echoes.forEach((el) => {
    el.textContent = raw || "ваш номер";
    el.classList.toggle("is-empty", !raw);
  });
  const text = raw ? `Вітаю! Шукаю запчастину, номер: ${raw}` : "Вітаю! Шукаю запчастину.";
  waLinks.forEach((a) => { a.href = `${WA_BASE}?text=${encodeURIComponent(text)}`; });
}
input?.addEventListener("input", update);
update();

// Hide the mobile channel bar while the keyboard is open.
input?.addEventListener("focus", () => document.body.classList.add("is-typing"));
input?.addEventListener("blur", () => document.body.classList.remove("is-typing"));

// Toast
let toastTimer = 0;
function showToast(msg: string): void {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = msg;
  requestAnimationFrame(() => toast.classList.add("is-shown"));
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-shown");
    window.setTimeout(() => { if (!toast.classList.contains("is-shown")) toast.textContent = ""; }, 300);
  }, 3000);
}

// Viber and Telegram cannot receive text in the link: copy the number, then let the link open the chat.
document.querySelectorAll<HTMLAnchorElement>("a[data-copy]").forEach((a) => {
  a.addEventListener("click", () => {
    const raw = clean(input?.value ?? "");
    if (!raw || !navigator.clipboard) return;
    navigator.clipboard.writeText(raw).then(
      () => showToast("Номер скопійовано — вставте в чат"),
      () => { /* clipboard refused: the chat still opens */ },
    );
  });
});

// Rotating placeholder examples (stops on focus or input; static with reduced motion).
const ph = document.querySelector<HTMLElement>("[data-ph]");
const examples = ["Номер з каталогу або з деталі", "Або VIN із техпаспорта", "Або код: SEVEN LPG"];
if (ph && input && !reduce) {
  let i = 0;
  const timer = window.setInterval(() => {
    if (document.activeElement === input || input.value) return;
    ph.classList.add("is-out");
    window.setTimeout(() => {
      i = (i + 1) % examples.length;
      ph.textContent = examples[i];
      ph.classList.remove("is-out");
      ph.classList.add("is-in");
      requestAnimationFrame(() => requestAnimationFrame(() => ph.classList.remove("is-in")));
    }, 300);
  }, 4000);
  window.addEventListener("pagehide", () => window.clearInterval(timer));
}

// Mobile menu (<details>): close after choosing a section and on Escape.
const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");
if (menu) {
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector<HTMLElement>("summary")?.focus();
    }
  });
}
