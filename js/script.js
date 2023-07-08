var timerElement = document.getElementById("timer");
var leaderboards = [];
var quizQuestion = [
  {
    question: "Question 1",
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: 1
  },
  {
    question: "Question 2",
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: 2
  },
  {
    question: "Question 3",
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: 3
  },
  {
    question: "Question 4",
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timerInterval;
var endTime;

const startElement = document.getElementById("start");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("multipleChoice");
const submitElement = document.getElementById("submit-button");
const initialsInput = document.getElementById("initials");

startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);

submitElement.style.display = "none";
initialsInput.style.display = "none";

function startButtonClicked() {
  setQuestion();
  startElement.style.display = "none";
  timerInterval = setInterval(updateTimer, 1175);
};

function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft + " seconds";
  if (timeLeft <= 0) {
    endQuiz();
  }
};

function setQuestion() {
  var currentQuestion = quizQuestion[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = document.createElement("li");
    choice.textContent = currentQuestion.choices[i];
    choice.addEventListener("click", () => {
      checkAnswer(i);
    })
    optionsElement.appendChild(choice);
  }
}

function checkAnswer(answerIndex) {
  var currentQuestion = quizQuestion[currentQuestionIndex];
  if (timeLeft <= 0) {
    endQuiz();
  }

  if (answerIndex === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 25;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestion.length) {
    setQuestion();
  } else {
    endQuiz();
  }
  saveScore();
}

function endQuiz() {
  clearInterval(timerInterval);
  endTime = timeLeft;
  timerElement.style.display = "none";
  optionsElement.style.display = "none";
  initialsInput.style.display = "block";
  submitElement.style.display = "block";
  questionElement.textContent = "Your score is " + score + " out of 100, with " + endTime + " second left. Enter your initials and click 'Submit' to save your score!";
}

function displayHighScore() {
  var storedHighScore = localStorage.getItem("leaderboards");
  if (storedHighScore) {
    score = parseInt(storedHighScore);
  }
  highScoreElement.textContent = score.toString();
}

function saveScore() {
  var initials = initialsInput.value;
  leaderboards.push(["user: " + initials, "score: " + score, "time left: " + endTime]);
  console.log(leaderboards);
  console.log('Score', timeLeft);
  if (timeLeft > score) {
    score = timeLeft;
    console.log("New High Score: ", score);
  }
  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
};