const header = document.querySelector("[data-site-header]");
const nav = document.querySelector("[data-site-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeNavigation = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove("is-open");
  header?.classList.remove("nav-visible");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("nav-visible", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("nav-open", Boolean(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
      navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
