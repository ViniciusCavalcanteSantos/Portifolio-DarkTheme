const header = document.querySelector(".header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".sk-progress svg circle");

window.addEventListener("scroll", () => {
  if(!skillsPlayed) skillsCounter();
})

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
function updateCount(counter, maxNum) {
  let currentNum = +counter.innerText;

  if(currentNum < maxNum) {
    counter.innerText = currentNum + 1;

    setTimeout(() => {
      updateCount(counter, maxNum);      
    }, 12)
  }
}

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