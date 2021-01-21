// Gathering HTML elements for use
var quiz = document.getElementById("quiz");
var results = document.getElementById("result");
var finalScore = document.getElementById("finalScore");
var gameover = document.getElementById("gameover");
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var startBtn = document.getElementById("startbtn");
var startPage = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscorePage = document.getElementById("high-scorePage");
var initials = document.getElementById("initials");
var highsoreInitials = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "What is the capital of New York State",
    choiceA: "New York City",
    choiceB: "Albany",
    choiceC: "Miami",
    choiceD: "Dallas",
    correctAnswer: "b"
},
{
    question: "What is the most Italian food?",
    choiceA: "Cheeseburgers",
    choiceB: "Pasta",
    choiceC: "Tacos",
    choiceD: "Sushi",
    correctAnswer: "b"
},
{
    question: "Who is the Mayor of Flavortown?",
    choiceA: "Gordan Ramsay",
    choiceB: "Guy Fieri",
    choiceC: "Martha Stewart",
    choiceD: "Tyler Blevins",
    correctAnswer: "b"
},
{
    question: "Coding is:",
    choiceA: "Fun",
    choiceB: "Hard",
    choiceC: "EZ PZ",
    choiceD: "Don't mention coding again",
    correctAnswer: "c"
},
{
    question: "Who is the Chosen One?",
    choiceA: "Obi-Wan-Kenobi",
    choiceB: "Anakin Skywalker",
    choiceC: "Mace Windu",
    choiceD: "Luke Skywalker",
    correctAnswer: "b"
},

];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// cycle through quiz questions to generate questions and answers
function generateQuizQuestion() {
    gameover.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// start quiz, start timer, hide start button
function startQuiz() {
    gameover.style.display = "none";
    startPage.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quiz.style.display = "block";
}
// display score on completion or time run out
function showScore() {
    quiz.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    initials.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// on submit, save and stringify highscores and push new user and score to local storage. then display highscore
submitScoreBtn.addEventListener("click", function highscore() {
    if (initials.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initials.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameover.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscorePage.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

// clears highscore and generates new list from local storage
function generateHighscores() {
    highsoreInitials.innerHTML = "";
    highscoreScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highsoreInitials.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}

// diplay highschore and hides all other components
function showHighscore() {
    startPage.style.display = "none"
    gameover.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clear local storage and text from highscores
function clearScore() {
    window.localStorage.clear();
    highsoreInitials.textContent = "";
    highscoreScore.textContent = "";
}

// resets all variable to replay quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameover.style.display = "none";
    startPage.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// checks user answer to correct answer
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// start quiz button
startBtn.addEventListener("click", startQuiz);