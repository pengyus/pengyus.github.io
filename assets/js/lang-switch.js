(() => {
  const storageKey = "preferredLang";

  const switcher = document.querySelector(".lang-switch");
  if (!switcher) return;

  const enUrl = switcher.getAttribute("data-url-en");
  const zhUrl = switcher.getAttribute("data-url-zh");
  if (!enUrl || !zhUrl) return;

  const enPath = new URL(enUrl, window.location.origin).pathname;
  const zhPath = new URL(zhUrl, window.location.origin).pathname;
  const currentPath = window.location.pathname;

  const isEnHome = currentPath === enPath || currentPath === `${enPath}index.html`;
  const isZhHome = currentPath === zhPath || currentPath === `${zhPath}index.html`;

  const readPreferredLang = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return value === "en" || value === "zh" ? value : null;
    } catch {
      return null;
    }
  };

  const writePreferredLang = (lang) => {
    if (lang !== "en" && lang !== "zh") return;
    try {
      window.localStorage.setItem(storageKey, lang);
    } catch {
      // ignore
    }
  };

  const goWithHash = (url) => {
    const hash = window.location.hash || "";
    window.location.replace(`${url}${hash}`);
  };

  const preferredLang = readPreferredLang();
  if (preferredLang === "zh" && isEnHome) goWithHash(zhUrl);
  if (preferredLang === "en" && isZhHome) goWithHash(enUrl);

  switcher.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-lang]");
    if (!link) return;

    const lang = link.getAttribute("data-lang");
    if (lang !== "en" && lang !== "zh") return;

    writePreferredLang(lang);

    const href = link.getAttribute("href");
    if (!href) return;

    event.preventDefault();
    const url = new URL(href, window.location.origin).pathname;
    window.location.href = `${url}${window.location.hash || ""}`;
  });
})();
