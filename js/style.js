const quizQuestion = [
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
]

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
var endTime;

const startElement = document.getElementById("start");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("multipleChoice");
const submitElement = document.getElementById("submit-button");
const initialsInput = document.getElementById("initials");

