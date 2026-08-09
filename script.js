// 1. Data (Quiz Questions) object: key/value
const questions = [
    {
        questions: "What is the primary goal of a business?",
        options: ["To provide value to customers", "To pay taxes", "To make a profit", "To employ people"],
        answer: 2 // index of your correct answer
    },

    {
        questions: "Which of these is an example of a fixed cost?",
        options: ["Raw materials","Rent", "Sales commissions", "Marketing expenses"],
        answer: 1// index of your correct answer
    },

    {
        questions: "What does ROI stand for in business?",
        options: ["Return on Investment", "Revenue of Interest", "Rate of Interest", "Reinvestment Opportunity"],
        answer: 0 // index of your correct answer
    },

     {
        questions: "Which one is marketing strategy?",
        options: ["Hiring staff", "Paying rent", "Buying equipment", "Social media advertisement"],
        answer: 3 // index of your correct answer
    },

     {
        questions: "What is target audience in business?",
        options: ["All people in a country", "Company employee", "Business competitors", "The specific group of customers a business aims to sell"],
        answer: 3 // index of your correct answer
    },

     {
        questions: "Which document shows a company's income and expenses?",
        options: ["Profit and loss statement", "Receipt", "Invoice", "Business plan"],
        answer: 0 // index of your correct answer
    },
]

// 2. State variables
let currentQuestionIndex = 0;
let score = 0;

// 3. DOM elements
const quizbody = document.getElementById("quiz-body");
const resultScreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// 4. functions
function loadQuestions () {
    const currentQ = questions[currentQuestionIndex];

    // update progress
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`
    progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%` // 1 / 4 * 100

    // Render title 
    questionTitle.textContent = currentQ.questions;

    // clear previous option buttons
    optionsContainer.innerHTML = "";

    // render options button dynamically
    currentQ.options.forEach((optionText, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = optionText;
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    })
}

function selectOption(selectedIndex, selectedBtn) {
    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    // disables all button once an option is picked
    buttons.forEach(btn => btn.disabled = true)

    // check answer
    if (selectedIndex === currentQ.answer) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        // show correct answer to user
        buttons[currentQ.answer].classList.add("correct");
    }

    // delay before going to the next question
    setTimeout(() => {
        currentQuestionIndex++
        if(currentQuestionIndex < questions.length) {
            loadQuestions();
        } else {
            showResults();
        }
    }, 1200)
}

function showResults () {
    quizbody.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${questions.length}!`;
}

const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add("hidden");
    quizbody.classList.remove("hidden");
    loadQuestions();
    }

// 5. Event listener
restartBtn.addEventListener('click', restartQuiz);

// initial load
loadQuestions();