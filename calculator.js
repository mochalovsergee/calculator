class Calculator {
	constructor() {
		this.display = document.getElementById("display-field");
		this.operatorSelected = false;
		this.display.value = 0;
		this.operator = "";
		this.maxLength = 15;
		this.cacheValue = 0;
		this.operations = {
			"+": (a, b) => a + b,
			"-": (a, b) => a - b, 
			"*": (a, b) => a * b,
			"/": (a, b) => a / b,
			"xⁿ": (a, b) => Math.pow(a, b),
			"√x": (a) => Math.sqrt(a)
		}
	}

	addNum(numeral) {
		if(this.operatorSelected) {
			this.display.value = numeral;
			this.operatorSelected = false;
		} else if(this.display.value != "0") {
			if(this.display.value.length < this.maxLength) {
				this.display.value += numeral;
			} else {
				this.display.value.length = this.maxLength;
			}
		} else {
			this.display.value = numeral;
		}
	}

	selectOp(operator) {
		if(this.display.value != "0") {
			this.cacheValue = this.display.value;
			this.operator = operator;
			this.operatorSelected = true;
		} else if (operator == "+" || operator == "-") {
			this.display.value = operator;
		}
	}

	equals(numeral) {
		if(this.operator) {
			var result = this.operations[this.operator](+this.cacheValue, +numeral);
			var strResult = result + "";
			if (strResult.length < this.maxLength) {
				this.display.value = strResult;
			} else {
				strResult = strResult.slice(0, this.maxLength);
				this.display.value = strResult;
			}
			this.cacheValue = this.display.value;
			this.operatorSelected = false;
		}
	}

	addDot(){
		if (~this.display.value.indexOf(".")) {
			this.display.value;
		} 
		else {
			if (this.display.value.length < this.maxLength) {
				this.display.value += "."
			}
		}
	}

	clearAll() {
		this.display.value = 0;
		this.cacheValue = 0;
		this.operator = "";
	}

	clearElement() {
		if(this.display.value.length == 1) {
			this.display.value = 0;
		} else {
			this.display.value = this.display.value.slice(0, this.display.value.length - 1);
		}	
	}
}

let calculator =  new Calculator();
let numButton = document.getElementsByClassName('num');
for (let i = 0; i < numButton.length; i++) {
	numButton[i].addEventListener("click", () => calculator.addNum(numButton[i].value));
};

let opButton = document.getElementsByClassName('operation');
for (let i = 0; i < opButton.length; i++) {
	opButton[i].addEventListener("click", () => calculator.selectOp(opButton[i].value));
};

let equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => calculator.equals(calculator.display.value));

let dotButton = document.getElementById("butDot");
dotButton.addEventListener("click", () => calculator.addDot());

let clearAll = document.getElementById("butC");
clearAll.addEventListener("click", () => calculator.clearAll());

let clearLastElement = document.getElementById("buttonBackspace");
clearLastElement.addEventListener("click", () => calculator.clearElement());


