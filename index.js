let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn")
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
    let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];

    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if (randomOperator == "-" && num2 > num1) {
        [num1, num2] = [num2, num1];
    }

    let solution = eval(`${num1}${randomOperator}${num2}`);

    let randomVar = randomValue(1, 5);

    if (randomVar == 1) {
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\>${randomOperator} ${num2} = ${solution}`;
    } else if (randomVar == 2) {
        answerValue = num2;
        question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"\>= ${solution}`;
    } else if (randomVar == 3) {
        answerValue = randomOperator;
        operatorQuestion = true;
        question.innerHTML = `${num1} <input type="number" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
    } else {
        answerValue = solution;
        question.innerHTML = `${num1} ${randomOperator} ${num2} <input type="number" id="inputValue" placeholder="?"\>`;
    }

    submitBtn.addEventListener("click", () => {
        errorMessage.classList.add("hide");
        let userInput = document.getElementById("inputValue").value;
        if (userInput.trim() === "") {
            errorMessage.classList.remove("hide");
            errorMessage.textContent = "Please enter a value.";
            return;
        }
        let userAnswer = parseInt(userInput);
        if (userAnswer === answerValue) {
            result.textContent = "Correct!";
        } else {
            result.textContent = "Incorrect!";
        }
    });
};


startBtn.addEventListener("click", () => {
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    controls.classList.add("hide");
    startBtn.classList.add("hide");

    questionGenerator();
});

const stopgame = (resultText) => {
    result.innerHTML = resultText;
    startBtn.innerHTML = "Restart";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide")
}
