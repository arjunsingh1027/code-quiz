// variables for each HTML element
const startBtn = document.getElementById("start");
const startQuiz = document.getElementById("start-quiz");
const questionsField = document.getElementById("questionsField");
const questionsText = document.getElementById("questionsText");
const answers = document.getElementById("answers");
const message = document.getElementById("message");
const time = document.getElementById("time");
const results = document.getElementById("results");
const score = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");
const $tbody = document.getElementById("score-keep");
const hsBtn = document.getElementById("view-highscores");
const scoresField = document.getElementById("scores-field");

let questionIndex = 0;

// questions
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

// new question function
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

// start button event listener
startBtn.addEventListener("click", function (e) {
    setTime();

    startQuiz.style.display = "none";
    questionsField.style.display = "block";

    newQuestion();
});

// user score
let finalScore = 0;
answers.addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.mathces("button")) return;
    const userAnswer = e.target.textContent;
    const question = questions[questionIndex];
    const rightAnswer = questions.answers[questions.answerIndex];

    if (userAnswer === rightAnswer) {
        feedbackMsg.textContent = "You are right!"
        finalScore += 20
    } else {
        secondsLeft -= 20
        feedbackMsg.textContent = "Wrong"
    }

    questionIndex++;

    if (questionIndex < 5) {
        newQuestion();
    } else {
        alert("Game Over")
        displayResults();
    }
});

hsBtn.addEventListener("click", function () {
    results.style.display = "none";
    scoresField.style.display = "block";
});

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const players = [];

    var playerInitials = document.getElementById("initials").value;

    var playerScore = finalScore;
    localStorage.setItem({ initials: playerInitials, score: playerScore })

    var position;

    function buildRow(player) {
        const $tr = document.createElement("td");
        const $position = document.createElement("td");
        const $initial = document.createElement("td");
        const $score = document.createElement("td");

        $position.textContent = position;
        $initial.textContent = playerInitials;
        $score.textContent = playerScore;

        $tr.appendChild($position, $initial, $score)

        return $tr;
    }
    players.forEach(function (player, i) {
        $tbody.appendChild(buildRow(player))
    })
})

var secondsLeft = 60;

function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        time.textContent = secondsLeft;
        if(questionIndex === 4){
            clearInterval(timerInterval)
        }
    }, 1000);
}

function displayResults(){
    score.textContent = finalScore;
    startQuiz.style.display = "none";
    questionsField.style.display = "none";
    results.style.display = "block";
}