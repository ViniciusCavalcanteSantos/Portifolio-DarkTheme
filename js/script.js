const header = document.querySelector(".header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".sk-progress svg circle");

window.addEventListener("scroll", () => {
  activeLink();
  if(!skillsPlayed) skillsCounter();
  if(!mlPlayed) mlCounter();
})

function updateCount(counter, maxNum) {
  let currentNum = +counter.innerText;

  if(currentNum < maxNum) {
    counter.innerText = currentNum + 1;

    setTimeout(() => {
      updateCount(counter, maxNum);      
    }, 12)
  }
}

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

/* ------------- BARRA DE PROGRESSO DAS SKILLS ------------- */
function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if(window.innerHeight >= topPosition + el.offsetHeight) {
    return true;
  }

  return false;
}

let skillsPlayed = false;
function skillsCounter() {
  if(!hasReached(first_skill)) return;
  
  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100)

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {updateCount(counter, target)}, 400);
  })

  progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards")
}

/* ------------- CONTADOR DO SERVIÇOS ------------- */
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".milestones span");
let mlPlayed = false;

function mlCounter() {
  if(!hasReached(ml_section)) return;

  mlPlayed = true;

  ml_counters.forEach((counter) => {
    let target = +counter.dataset.target;
    
    setTimeout(() => {updateCount(counter, target)}, 400);
  })
}

/* ------------- PORTIFOLIO ------------- */
const mixer = mixitup(".portifolio-gallery", {
  selectors: {
      target: '.prt-card'
  },
  animation: {
      duration: 500
  }
});

/* ------------- PORTIFOLIO MODAL ------------- */
const prt_section = document.querySelector(".portifolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".modal .images img");

const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

let currentIndex = 0;
zoom_icons.forEach((icon, i) => icon.addEventListener("click", () => {
  prt_section.classList.add("open");
  document.body.classList.add("stopScrolling")
  currentIndex = i;
  changeImage(currentIndex);
}));

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling")
});

prev_btn.addEventListener("click", () => {
  if(currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }

  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if(currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach(img => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

/* ------------- SWIPER SLIDER ------------- */
const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

/* ------------- LINK ATIVO ------------- */
const links = document.querySelectorAll(".nav-link");

activeLink();
function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSections = Array.from(sections).map((section, i) => {
    return {
      y: section.getBoundingClientRect().top - header.offsetHeight,
      id: i
    }
  })
  .filter((section) => section.y <= 0);
  let currentSectionID = passedSections.at(-1).id;

  links.forEach(link => link.classList.remove("active"));
  links[currentSectionID].classList.add("active");
}

/* ------------- TOGGLE TEMA DA PÁGINA ------------- */
const toggle_btn = document.querySelector(".toggle-btn");
const firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);
function changeTheme(isDark) {
  if(isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}

toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});