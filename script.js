const buttonGrid = document.querySelector(".button-grid");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".button-clear");
const backspaceButton = document.querySelector(".backspace");

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;
const modulus = (num1, num2) => num1 % num2;
const clear = () => {
	display.innerHTML = 0;
	numberList = operationList = [];
};

let numberList = [];
let operationList = [];

function handleButtonGridClick(event) {
	const clickedButton = event.target;

	if (clickedButton.classList.contains("button-number")) {
		handleNumberClick(clickedButton);
	} else if (clickedButton.classList.contains("button-operator")) {
		handleOperatorClick(clickedButton);
	} else if (clickedButton.classList.contains("button-control")) {
		handleControlClick(clickedButton);
	}
}

function handleNumberClick(button) {
	const value = button.innerHTML;
	updateDisplay(value);
}

function handleOperatorClick(button) {
	const value = button.innerHTML;

	switch (value) {
		case "%":
			operationList.push(modulus);
			numberList.push(parseFloat(display.innerHTML));
			break;
		case "+":
			operationList.push(add);
			numberList.push(parseFloat(display.innerHTML));
			break;
		case "-":
			operationList.push(subtract);
			numberList.push(parseFloat(display.innerHTML));
			break;
		case "*":
			operationList.push(multiply);
			numberList.push(parseFloat(display.innerHTML));
			break;
		case "/":
			operationList.push(divide);
			numberList.push(parseFloat(display.innerHTML));
		case "=":
			calculateAll();
			return;
	}
	display.innerHTML = "0";
}

function handleControlClick(button) {
	const value = button.innerHTML;

	switch (value) {
		case "+-":
			handlePlusMinusClick();
			break;
		case "C":
			clear();
			break;
	}
}

function handlePlusMinusClick() {
	if (display.innerHTML === "0") return;
	display.innerHTML = `-${display.innerHTML}`;
}

function updateDisplay(value, override = false) {
	if (display.innerHTML === "0" && value !== ".") display.innerHTML = value;
	else if (value === "." && display.innerHTML.includes(".")) return;
	else if (override) display.innerHTML = value;
	else display.innerHTML += value;

	if (
		display.innerHTML === "" ||
		display.innerHTML === "-" ||
		display.innerHTML === "."
	)
		display.innerHTML = "0";
}

function calculateAll() {
	numberList.push(parseFloat(display.innerHTML));
	let result = numberList.shift();
	const len = operationList.length;

	for (let i = 0; i < len; i++) {
		console.log(i, operationList.length);
		result = operationList.shift()(result, numberList.shift());
	}
	display.innerHTML = result;
}

buttonGrid.addEventListener("click", handleButtonGridClick);

backspaceButton.addEventListener("click", () => {
	updateDisplay(display.innerHTML.slice(0, -1), true);
});
