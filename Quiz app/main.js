let questions = [
    {
        question: 'What is html?',
        answers: [
            { text: 'hyper text markup language', correct: true},
            { text: 'hyper text mark language', correct: false},
            { text: 'hyper transfer markup language', correct: false},
            { text: 'hyper text transfer protocol ', correct: false}
        ]
    },
    {
        question: 'What is Css?',
        answers: [
            { text: 'Structure for web page', correct: false},
            { text: 'Sound for web page', correct: false},
            { text: 'Style for web page', correct: true},
            { text: 'Sass ', correct: false}
        ]
    },
    {
        question: 'JavaScript?',
        answers: [
            { text: 'Is compipler', correct: false},
            { text: 'Is interpreter', correct: true},
            { text: 'No compipler No interpreter', correct: false},
            { text: 'Is compipler and interpreter', correct: false}
        ]
    },
    {
        question: 'Python?',
        answers: [
            { text: 'Is compipler', correct: false},
            { text: 'No compipler No interpreter', correct: false},
            { text: 'Is interpreter', correct: true},
            { text: 'Is compipler and interpreter', correct: false}
        ]
    }
];

let = questionElement = document.getElementById('question');
let = answerButtons = document.getElementById('answer-buttons');
let  nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e){
    let selectBtn = e.target;
    let isCorrect = selectBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectBtn.classList.add('correct');
    }else{
        selectBtn.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
            score++;
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = 'play Again';
    nextBtn.style.display = 'block';
}

function handelNextBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else{
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handelNextBtn();
    } else{
        startQuiz();
    }
})

startQuiz();