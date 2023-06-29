const letterElements = document.getElementsByClassName('letter_element');
const letterButtons = document.getElementsByClassName('letter_button');
const attempts = document.getElementsByClassName('attempt');
const hangmanGrid = document.getElementById('hangman');
const glitchImg = document.getElementById('glitch_img');
const glitchLayers = document.getElementById('glitch_layers');
const title = document.getElementsByClassName('title')[0];
const glitchText = document.getElementsByClassName('glitch_text')[0];
const stage = document.getElementById('stage');
const stageCompletedText = document.getElementById('glitch_text_1');
const allCompletedElement = document.getElementById('glitch_text_2');
const allCompletedText = document.getElementById('glitch_text_content');
const quizQuestion = document.getElementById("quiz_question");

let randomQuiz = '';
let randomGenre = '';
let randomIndex = 0;
let unsuccessfulAttempts = 0;
let currentStage = 1;

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
for (let i = 0; i < letterButtons.length; i++) {
  letterButtons[i].innerText = alphabet[i];
}

function newQuestion() {
  randomQuiz = quiz[Math.floor(Math.random() * quiz.length)];
  randomIndex = quiz.indexOf(randomQuiz);
  randomGenre = 'movies';
  randomQuiz = randomQuiz['title'];
  const quizTitle = document.getElementById('quiz_title');
  quizTitle.innerText = randomGenre;
  const quizQuestion = document.getElementById('quiz_question');
  let questionContent = '';
  for (const letterButton of letterButtons) {
    letterButton.classList.remove('tested');
  }
  unsuccessfulAttempts = 0;
  for (let i = 0; i < randomQuiz.length; i++) {
    questionContent += RegExp(/^\p{L}/, 'u').test(randomQuiz[i]) ? '_' : randomQuiz[i];
  }
  quizQuestion.innerText = questionContent;
  stage.innerText = `Current stage: ${currentStage}/10`;
}

newQuestion();

function checkLetter(event) {
  const letter = event.target.innerText;
  event.target.classList.add('tested');
  randomQuiz.toUpperCase().includes(letter) ? successfulAttempt(letter) : unsuccessfulAttempt(letter);
  if (quizQuestion.innerText === randomQuiz.toUpperCase()) {
    currentStage === 10 ? allIsNowComplete() : questionCompleted();
  }
}

function unsuccessfulAttempt(letter) {
  unsuccessfulAttempts++;
  attempts[unsuccessfulAttempts - 1].style.color = 'red';
  if (unsuccessfulAttempts === 4) questionFailed();
}

function successfulAttempt(letter) {
  for (let i = 0; i < randomQuiz.length; i++) {
    if (letter === randomQuiz[i].toUpperCase()) {
      quizQuestion.innerText = quizQuestion.innerText.replaceAt(i, letter);
    }
  }
}

async function questionCompleted() {
  hangmanGrid.style.display = 'none';
  currentStage++;
  stageCompletedText.style.display = 'block';
  quiz.splice(randomIndex, 1);
  await wait(1200);
  hangmanGrid.style.display = 'block';
  stageCompletedText.style.display = 'none';
  for (const attempt of attempts) {
    attempt.style.color = 'inherit';
  }
  newQuestion();
}

async function allIsNowComplete() {
  hangmanGrid.style.display = 'none';
  currentStage++;
  allCompletedElement.style.display = 'block';
  const inscripMessages = [
    'Congratulations!',
    'Most people are so ungrateful to be alive...',
    'But not you...',
    'Not anymore...'
  ];
  for (let i = 0; i < inscripMessages.length; i++) {
    allCompletedText.innerText = inscripMessages[i];
    const toWait = i < (inscripMessages.length - 1) ? 1360 : 1200;
    await wait(toWait);
  }
}

async function questionFailed() {
  hangmanGrid.style.display = 'none';
  glitchImg.style.display = 'block';
  glitchLayers.style.display = 'block';
  title.style.display = 'none';
  glitchText.style.display = 'block';
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
