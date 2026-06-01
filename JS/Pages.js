// Animation d’apparition pour tous les éléments .reveal

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible"); // rejoue quand tu remontes
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  }
);

reveals.forEach((el) => observer.observe(el));

// 2) Parallax : seule l’image bouge pendant la hero
if (hero && heroImage) {
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const heroHeight = rect.height;

        const progress = Math.min(Math.max((-rect.top / heroHeight), 0), 1);
        const maxMove = 350;

        heroImage.style.transform = `translate3d(0, ${progress * maxMove}px, 0)`;

        ticking = false;
      });

      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
const openCv = document.getElementById("openCv");
const cvModal = document.getElementById("cvModal");
const closeCv = document.getElementById("closeCv");
const closeCvBtn = document.getElementById("closeCvBtn");

const cvPreview = document.querySelector(".cv-preview");

function openModal() {
  cvModal.classList.add("is-open");
  cvModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  cvModal.classList.remove("is-open");
  cvModal.setAttribute("aria-hidden", "true");
}

if (openCv && cvModal) {
  openCv.addEventListener("click", openModal);
}
if (cvPreview) {
  cvPreview.addEventListener("click", openModal);
  cvPreview.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openModal();
  });
}
if (closeCv) closeCv.addEventListener("click", closeModal);
if (closeCvBtn) closeCvBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cvModal.classList.contains("is-open")) closeModal();
});
const header = document.querySelector("header");

header.addEventListener("mousemove", (e) => {
  const rect = header.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  header.style.setProperty("--x", x + "px");
  header.style.setProperty("--y", y + "px");
});


const loisirCards = document.querySelectorAll(".loisir-card");

loisirCards.forEach(card => {
  const video = card.querySelector("video");

  card.addEventListener("mouseenter", () => {
    video.currentTime = 0; // repart du début
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0; // reset propre
  });

  // stop à la fin (au cas où)
  video.addEventListener("ended", () => {
    video.currentTime = video.duration; // reste sur la dernière frame
  });
});
