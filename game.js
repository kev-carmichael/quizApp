
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const spinner = document.getElementById("spinner");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let timeLeft = document.querySelector(".time-left");
let count = 11;
let countdown;

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if (count == 0) {
        clearInterval(countdown);
        getNewQuestion();
      }
    }, 1000);
  };

    //clear interval(stop timer)
    clearInterval(countdown);



let questions = [];
let amount = 0;
difficulty = 'medium';

function get () {
    var first = sessionStorage.getItem("first");
    var second = sessionStorage.getItem("second");
  
    console.log(first);  
    console.log(second);
  
    // (EXTRA) CLEAR SESSION STORAGE
    // sessionStorage.removeItem("KEY");
    // sessionStorage.clear();
    amount = first;
    difficulty = second;
  }
  

get();

fetch(
    'https://opentdb.com/api.php?amount='+amount+'&category=9&difficulty='+difficulty+'&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = amount;




startGame = () => {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];

    clearInterval(countdown);
    count = 11;
    timerDisplay();

    getNewQuestion();
    game.classList.remove("hidden");
    spinner.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        //need above because the available questions may be more than no of questions you've set 
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;

    clearInterval(countdown);
    count = 11;
    timerDisplay();

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    scoreText.innerText = score;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 102}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);
        if (classToApply == 'correct') {
            score += CORRECT_BONUS;
        }
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 750);
    });
});

