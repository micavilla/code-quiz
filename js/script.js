var timerElement = document.getElementById("timer");
var leaderboards = [];

// array containing pre-determined quiz questions 
var quizQuestions = [
{
  question: "Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?",
  options: ["unshift()","sort()","splice()","toString()"],
  answer: 0,
},
{
  question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
  options: ["last()","put()","push()","None of the above"],
  answer: 2,
},
{
  question: "Which of the following function of String object returns the calling string value converted to upper case?",
  options: ["toLocaleUpperCase()","toUpperCase()","toString()","substring()"],
  answer: 1,
},
{
  question: "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
  options: ["concat()","pop()","push()","some()"],
  answer: 0,
},
];

// starting points of variables 
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
var endTime;
const startElement = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitElement = document.getElementById("submit-button");
const textboxElement = document.getElementById("initials");

// giving interactivity to buttons 
startElement.addEventListener("click", startButtonClicked);
submitElement.addEventListener("click", saveScore);
submitElement.style.display = "none";
textboxElement.style.display = "none";

// starts quiz and sets time interval
function startButtonClicked() {
  setQuestion();
  startElement.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
};

// decreases time left by 1 second and calls stop quiz function at 0 
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
};

// displays quiz questions 
function setQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = currentQuestion.options[i];
    choice.addEventListener("click", () => {
      checkAnswer(i);
    });
    optionsElement.appendChild(choice);
  };
};

// validates clicked answer 
function checkAnswer(answerIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (timeLeft <= 0){
    endQuiz();
  };
  if (answerIndex === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    setQuestion();
  } else {
      endQuiz();
  }
};

// ends quiz and displays score
function endQuiz() {
  clearInterval(timerInterval);
  endTime = timeLeft;
  timerElement.style.display = "none";
  optionsElement.style.display = "none";
  textboxElement.style.display = "block";
  submitElement.style.display = "block";
  questionElement.textContent = "Your score is " + score + " out of 4, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
};

// displays high score element
function displayHighscore() {
  var storedHighScore = localStorage.getItem("leaderboards");
  if (storedHighScore) {
    score = parseInt(storedHighScore);
  }
  highScoreElement.textContent = score.toString();
}

// saves score to local storage 
function saveScore() {
  var initials = textboxElement.value;
  var capInit = initials.toUpperCase();
  var totalScore = {
    Initials: capInit,
    Score: score,
    Time: endTime
  };
  leaderboards.push(totalScore);
  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
};

// lists high scores on html and connects to lead js
function listHighScores() {
  console.log(leaderboards)
  for (var i = 0; i < leaderboards.length; i++) {
      var highScores = leaderboards[i];
      var li = document.createElement("li");
      li.textContent = highScores.Initials + " your score is " + highScores.Score + " out of 4.";
      leaderBoard.appendChild(li);
  }
}
function displayHighscore() {
  var storedHighScores = JSON.parse(localStorage.getItem("leaderboards"));
  if (storedHighScores != null) {
      leaderboards = storedHighScores;
  }
  listHighScores()
}
displayHighscore()