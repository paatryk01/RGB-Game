var numberOfSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1Background = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

resetButton.addEventListener("click", function(){
	reset();
});

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			// this.textContent === "EASY"? numberOfSquares=3 : numberOfSquares=6;
			if(this.textContent === "EASY"){
				numberOfSquares = 3;
			}
			else if(this.textContent === "HARD"){
				numberOfSquares = 6;
			} else {
				numberOfSquares = 9;
			}
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		//Dodajemy zdarzenie kliknięcia w kwadrat.
			squares[i].addEventListener("click", function(){
			//Pobieramy wartość tła dla klikniętego elementu.
			var clickedColor = this.style.backgroundColor;
			//Porównanie tła wybranego elementu z szukanym kolorem.
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1Background.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play again?";
			}else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}


function reset (){
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}		
	}
	h1Background.style.backgroundColor = "steelblue";
}

//Po prawidłowym wybraniu, każdy kwadrat zmieni kolor na prawidłowy.
function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

//Wybieramy szukany kolor z 3, 6 lub 9 opcji.
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random]
}

//Tworzymy tablicę z wcześniej wymyślonymi losowo numerami.
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr
}

//Losujemy 3 wartości rgb z których tworzy się jeden kolor rgb.
function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

