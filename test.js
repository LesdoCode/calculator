const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

let numberList = [1, 1, 1];
let operationList = [add, add, add];

class display {
	static innerHTML = "1";
	static constructor() {}
	static show() {
		console.log(this.innerHTML);
	}
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
	display.show();
}

calculateAll();
