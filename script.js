// variables for each HTML element
const startBtn = document.getElementById("start");
const startQuiz = document.getElementById("start-quiz");
const questionsField = document.getElementById("questionsField");
const questionsText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const message = document.getElementById("message");
const time = document.getElementById("time");
const results = document.getElementById("results");
const score = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");
const $tbody = document.getElementById("score-keep");
const hsBtn = document.getElementById("view-highscores");
const scoresField = document.getElementById("highscores-field");

let questionIndex = 0;

const question = [
    {
        question: "What is the capital of New York State?",
        answers: ["New York City", "Albany", "Miami", "Dallas"],
        answerIndex: 1
    },
    {
        question: "What is the most Italian food?",
        answers: ["Cheeseburgers", "Pasta", "Tacos", "Sushi"],
        answerIndex: 1
    },
    {
        question: "Who is the Mayor of Flavortown ?",
        answers: ["Gordon Ramsey", "Tyler Blevins", "Guy Fieri", "Martha Stewart"],
        answerIndex: 2
    },
    {
        question: "True or False: Dwayne Johsnon is a rock",
        answers: ["True", "False"],
        answerIndex: 1
    },
    {
        question: "Who is the Chosen One?",
        answers: ["Anakin Skywalker", "Obi-Wan-Kenobi", "Mace Windu", "Luke Skywalker"],
        answerIndex: 0
    },
]

function newQuestion() {
    const currentQuestion = questions[questionIndex];
    questionsText.textContent = currentQuestion.question;

    answers.innerHTML = "";

    for (let i = 0; i < currentQuestion.answers.lenght; i++) {
        const answer = currentQuestion.answers[i];
        const answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "btn btn-primary mx-1");
        answerBtn.textContent = answer;
        answers.appendChild(answerBtn);
    }
}

