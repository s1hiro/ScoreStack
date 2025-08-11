// sidenav toggler

let sideNavButton = document.getElementById("sideNav-button");
let sideNav = document.getElementById("sidenav");

const openIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-panel-right-open-icon lucide-panel-right-open">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M15 3v18"/>
  <path d="m10 15-3-3 3-3"/>
</svg>
`;

const closeIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-panel-right-close-icon lucide-panel-right-close">
  <rect width="18" height="18" x="3" y="3" rx="2"/>
  <path d="M15 3v18"/>
  <path d="m8 9 3 3-3 3"/>
</svg>
`;

sideNavButton.innerHTML = openIcon;

sideNavButton.onclick = function () {
  sideNav.classList.toggle("collapsed");

  // Switch icon based on sidebar state
  if (sideNav.classList.contains("collapsed")) {
    sideNavButton.innerHTML = closeIcon;
  } else {
    sideNavButton.innerHTML = openIcon;
  }
};

// new thing

const flashcards = [];
const flashcardForm = document.getElementById('flashcardForm');
const flashcardContainer = document.getElementById('flashcardContainer');

flashcardForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop form refresh

  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (question && answer) {
    const flashcard = { question, answer };
    flashcards.push(flashcard);
    renderFlashcard(flashcard);
    flashcardForm.reset();
  }
});

function renderFlashcard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('flashcard');
  cardElement.textContent = card.question;

  let showingQuestion = true;

  cardElement.addEventListener('click', function() {
    cardElement.textContent = showingQuestion ? card.answer : card.question;
    showingQuestion = !showingQuestion;
  });

  flashcardContainer.appendChild(cardElement);
}
