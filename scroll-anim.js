(() => {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const SELECTORS = [
    "section",
    ".feature-card",
    ".service-card",
    ".repair-box",
    ".trust-card",
    ".why-card",
    ".product-card",
    ".device-card",
    ".branch-box",
    ".contact-card",
    ".partner-box",
    ".jbl-card",
  ].join(",");

  const shouldSkip = (el) => {
    if (!(el instanceof HTMLElement)) return true;
    if (el.classList.contains("reveal-ignore")) return true;
    if (el.closest(".swiper, .swiper-wrapper, .swiper-slide")) return true; // don't fight sliders
    if (el.closest("header.navbar, footer.footer")) return true;
    return false;
  };

  const elements = Array.from(document.querySelectorAll(SELECTORS)).filter((el) => !shouldSkip(el));

  // Basic stagger: cards inside the same parent get increasing delay.
  // Caps at 6 so it doesn't get too slow.
  const parentBuckets = new Map();
  for (const el of elements) {
    const parent = el.parentElement;
    if (!parent) continue;
    const i = parentBuckets.get(parent) ?? 0;
    parentBuckets.set(parent, i + 1);
    const delayIndex = Math.min(i, 6);
    el.style.setProperty("--reveal-delay", `${delayIndex * 70}ms`);
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    for (const el of elements) el.classList.add("reveal-on-scroll", "is-visible");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add("is-visible");
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  for (const el of elements) {
    el.classList.add("reveal-on-scroll");
    io.observe(el);
  }
})();

