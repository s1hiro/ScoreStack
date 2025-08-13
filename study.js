let database = firebase.database().ref();

const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
const flashcardForm = document.getElementById('flashcardForm');
const flashcardContainer = document.getElementById('flashcardContainer');

// Render any saved flashcards on page load
console.log("type", typeof database)
console.log(database)
database.on("child_added", renderFlashcard);

flashcardForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (question && answer) {
    if (question != answer) {
      const flashcard = { question, answer };
      database.push(flashcard);

      flashcardForm.reset();
    } else {
      alert("Question and answer cannot be the same.");
    }
  }
});

function renderFlashcard(card) {
  const key = card.key;
  card = card.val();
  const cardElement = document.createElement('div');
  cardElement.classList.add('flashcard');

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent flipping on delete
    deleteFlashcard(key);
    cardElement.remove();
  });
  deleteBtn.id = key;

  // Container for question/answer text
  const textElement = document.createElement('div');
  console.log(card)
  textElement.textContent = card.question;

  let showingQuestion = true;
  cardElement.addEventListener('click', function () {
    textElement.textContent = showingQuestion ? card.answer : card.question;
    showingQuestion = !showingQuestion;
  });

  // Append delete button + text to flashcard
  cardElement.appendChild(deleteBtn);
  cardElement.appendChild(textElement);

  flashcardContainer.appendChild(cardElement);
}

function deleteFlashcard(cardToDelete) {
  database.child(cardToDelete).remove();
}