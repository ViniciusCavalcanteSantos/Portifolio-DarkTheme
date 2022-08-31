const header = document.querySelector(".header");

/* ------------- NAVBAR ------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

window.addEventListener("scroll", stickyNavbar);
