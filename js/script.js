const header = document.querySelector(".header");

/* ------------- NAVBAR ------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

window.addEventListener("scroll", stickyNavbar);

/* ------------- ANIMAÇÃO DE REVEAL ------------- */
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px"
})

sr.reveal(".showcase-info", {delay: 300});
sr.reveal(".showcase-image", {origin: "top", delay: 400});