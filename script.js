// sidenav code

const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
const flashcardForm = document.getElementById('flashcardForm');
const flashcardContainer = document.getElementById('flashcardContainer');

// Render any saved flashcards on page load
flashcards.forEach(renderFlashcard);

flashcardForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (question && answer) {
    const flashcard = { question, answer };
    flashcards.push(flashcard);

    // localstorage save
    localStorage.setItem("flashcards", JSON.stringify(flashcards));

    renderFlashcard(flashcard);
    flashcardForm.reset();
  }
});

function renderFlashcard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('flashcard');

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent flipping on delete
    deleteFlashcard(card);
    cardElement.remove();
  });

  // Container for question/answer text
  const textElement = document.createElement('div');
  textElement.textContent = card.question;

  let showingQuestion = true;
  cardElement.addEventListener('click', function() {
    textElement.textContent = showingQuestion ? card.answer : card.question;
    showingQuestion = !showingQuestion;
  });

  // Append delete button + text to flashcard
  cardElement.appendChild(deleteBtn);
  cardElement.appendChild(textElement);

  flashcardContainer.appendChild(cardElement);
}

function deleteFlashcard(cardToDelete) {
  const index = flashcards.findIndex(c => 
    c.question === cardToDelete.question && c.answer === cardToDelete.answer
  );
  if (index > -1) {
    flashcards.splice(index, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }
}

