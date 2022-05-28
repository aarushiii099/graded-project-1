const questionn = document.getElementById('questionn');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
// const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
// let score = 0;
let questionCounter = 0;
let availableQuesions = {};

let questions = [];

let questionIndex=0;

fetch('questionNew.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        const myTimeout = setTimeout(startGame, 1000);
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
// const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0;
    // score = 0;
    // availableQuesions = [...questions];
    availableQuesions = {...questions};
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (Object.keys(availableQuesions).length === 0 || questionCounter >= MAX_QUESTIONS) {
        // localStorage.setItem('mostRecentScore', score);
        // //go to the end page
        return window.location.assign('/end.html');
    }
    questionIndex++;
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // //Update the progress bar
    // progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    // const questionIndex=1;
    let objNumber='data'+questionIndex
    currentQuestion = availableQuesions.objNumber;//is an object
    questionn.innerText = currentQuestion.question;

    

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        // choice.innerText = currentQuestion['choice' + number];
        choice.innerText = currentQuestion.options[number-1];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        console.log(selectedChoice);
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // if (classToApply === 'correct') {
        //     incrementScore(CORRECT_BONUS);
        // }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// incrementScore = (num) => {
//     score += num;
//     scoreText.innerText = score;
// };
