const slides = document.querySelectorAll(".hero-slide");
const typingText = document.querySelector(".typing-text");

const slideWords = [
  "/self",
  "/skills",
  "/potential",
  "/career"
];

let currentSlide = 0;
let characterIndex = 0;
let typingTimer;

function typeText() {
  const currentWord = slideWords[currentSlide];

  typingText.classList.remove("blink");

  if (characterIndex < currentWord.length) {
    typingText.textContent = currentWord.substring(0,characterIndex + 1);

    characterIndex++;

    typingTimer = setTimeout(typeText, 180);
  } else {
    typingText.classList.add("blink");
  }
}

function changeSlide() {
  clearTimeout(typingTimer);

  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");

  characterIndex = 0;
  typingText.textContent = "";

  typeText();
}

typeText();

setInterval(changeSlide, 4000);

const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", () => {
    dropdowns.forEach((item) => {
      if (item !== dropdown) {
        item.classList.remove("open");
      }
    });

    dropdown.classList.toggle("open");
  });
});