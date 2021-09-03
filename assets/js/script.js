// global variables
var timerInterval;

var currentQuestion = 0;

var score = 0;

var highScores = [];

var timeLeft = 90;

// global constants
const timer = document.getElementById('timer');

const formQuestion = document.getElementById('form-question');

const startButton = document.getElementById('start');

const formQuiz = document.getElementById('form-quiz');

const intro = document.getElementById('intro');

const answer1 = document.getElementById('submit-answer1');

const answer2 = document.getElementById('submit-answer2');

const answer3 = document.getElementById('submit-answer3');

const answer4 = document.getElementById('submit-answer4');

const result = document.getElementById('result');

const quizResult = document.getElementById('quiz-result');

const finalScore = document.getElementById('score');

const viewHighScores = document.getElementById('view-highscores');

const highScoreOverlay = document.getElementById('high-score');

const returnButton = document.getElementById('return');

const initials = document.getElementById('initials');

const submitInitials = document.getElementById('submit-initials');

const resetHighScores = document.getElementById('clear-scores');

// function to end game
function endGame() {
    formQuiz.style.display = "none";
    quizResult.style.display = "block";
    finalScore.textContent = score;
}

// reset timer after time reaches zero
function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(function() {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
        timer.textContent = "Time: " + timeLeft;

    }, 1000);
}

// start quiz on button click
startButton.addEventListener('click', function(event) {
    event.preventDefault();
    intro.style.display = "none";
    formQuiz.style.display = "block";
    displayQuestion();
    resetTimer();
});
// view high scores by clicking link
viewHighScores.addEventListener('click', function(event) {
    event.preventDefault();
    highScoreOverlay.style.display = "block";
    clearInterval(timerInterval);
});
//return to quiz from high score screen
returnButton.addEventListener('click', function(event) {
    event.preventDefault();
    highScoreOverlay.style.display = "none";
    resetTimer();
});



// Array of questions for quiz
var questions = [{
        question: "How do you display an alert box with the words \"Coding Quiz\"?",
        answers: {
            1: "displayBox(\"Coding Quiz\")",
            2: "writeAlert(\"Coding Quiz\")",
            3: "alert(\"Coding Quiz\")",
            4: "boxAlert(\"Coding Quiz\")"
        },
        correctAnswer: 3
    },
    {
        question: "What do you use to enclose the variables in an array?",
        answers: {
            1: "Quotation marks \"\"",
            2: "Curly brackets {}",
            3: "Parenthesis ()",
            4: "Square Brackets []"
        },
        correctAnswer: 4
    },
    {
        question: "How do you call a function named \"thisFunction\"?",
        answers: {
            1: "thisFunction().call",
            2: "thisFunction()",
            3: "callFunction thisFunction",
            4: "call thisFunction"
        },
        correctAnswer: 2
    },
    {
        question: "How do you write an if statement to run code if \"i\" does not equal 9?",
        answers: {
            1: "if i-=9",
            2: "if (i=!9)",
            3: "if i!=9",
            4: "if (i!=9)"
        },
        correctAnswer: 4
    },
    {
        question: "Choose the correctly written array.",
        answers: {
            1: "var animals = [\"cats\", \"dogs\", \"horses\", \"cows\"]",
            2: "var animals = [\"cats, dogs, horses, cows\"]",
            3: "var animals = (\"cats, dogs, horses, cows\")",
            4: "var animals = [cats dogs horses cows]"
        },
        correctAnswer: 1
    }
];
// display all possible answers as buttons
function displayQuestion() {
    formQuestion.textContent = questions[currentQuestion].question;
    answer1.textContent = " 1. " + questions[currentQuestion].answers[1];
    answer2.textContent = " 2. " + questions[currentQuestion].answers[2];
    answer3.textContent = " 3. " + questions[currentQuestion].answers[3];
    answer4.textContent = " 4. " + questions[currentQuestion].answers[4];
};

answer1.addEventListener('click', function(event) {
    event.preventDefault();
    showResult(1);
});

answer2.addEventListener('click', function(event) {
    event.preventDefault();
    showResult(2);
});

answer3.addEventListener('click', function(event) {
    event.preventDefault();
    showResult(3);
});

answer4.addEventListener('click', function(event) {
    event.preventDefault();
    showResult(4);
});
// display "correct" or "incorrect" based on which answer was clicked
function showResult(answer) {
    result.style.display = "block";
    if (questions[currentQuestion].correctAnswer === answer) {
        result.textContent = "Correct!";
        score++;
    } else {
        result.textContent = "Incorrect!";
        timeLeft -= 10;
        timer.textContent = "Time: " + timeLeft;
    }
    setTimeout(function() {
        result.style.display = "none";
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            clearInterval(timerInterval);
            endGame();
        } else {
            displayQuestion();
        }
    }, 3000);
}
//reset score and timer to restart quiz
function resetQuiz() {
    quizResult.style.display = "none";
    formQuiz.style.display = "block";
    currentQuestion = 0;
    score = 0;
    timeLeft = 90;
    timer.textContent = "Time: " + timeLeft;
    displayQuestion();
    clearInterval(timerInterval);
    resetTimer();
}
// display high score list
function renderHighScores() {
    var highScoreList = highScoreOverlay.querySelector("ol");
    highScoreList.innerHTML = "";
    for (i = 0; i < highScores.length; i++) {
        var item = document.createElement('li');
        item.textContent = highScores[i].name + " " + highScores[i].score;
        highScoreList.appendChild(item);
    }
}
// prompt to enter user initials after game ends
submitInitials.addEventListener('click', function(event) {
    event.preventDefault();
    var name = initials.value;
    highScores.push({ name: name, score: score });
    highScores.sort(function(a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score > b.score) {
            return -1;
        } else {
            return 0;
        }

    });
    highScoreOverlay.style.display = "block";
    clearInterval(timerInterval);
    renderHighScores();
    resetQuiz();
});