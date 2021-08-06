// Note: The entire code is written as Modern JS ES(6) Syntax

'use strict'; //use strict is used when we want the JS complier to check the code in strict mode, you can read about it from Internet
//Setting up all the global variables
const input = document.querySelector('.guess');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const failed = document.querySelector('.failed');
const attemptsLeft = document.querySelector('.attempts-left');
let successAttempts = 0; //variable for counting success attempts i.e Score
let failedAttempts = 0; //variable for counting failed attempets i.e Failed
let attempts = 50; //variable for counting Attempts Left
document.querySelector('.check').addEventListener('click', () => {
  //Play game when Attempts left > 0
  if (attempts > 0) {
    //converting input value to Number from string, if input is empty Number will convert it into 0 and stroring the converted input to 'guess' variable
    let guess = Number(input.value);
    //if no value is entered then 'guess' value will be 0, so Bellow, we are checking if guess has value 0 then show an error
    if (!guess) {
      removeGreen(message);
      red(message);
      addContent(message, '⛔ No number');
    } else if (guess >= 1 && guess <= 20) {
      //This is the main code for the App, when user entered number between 1 and 20 then Play the game Properly
      let randomNumber = Math.floor(Math.random() * 20 + 1); //Function for generating random number between 1 and 20
      if (guess === randomNumber) {
        //when user input and app generated number both are Equal
        const successAudio = new Audio('sound1.wav');
        successAudio.play();
        removeRed(message);
        green(message);
        addContent(message, '✅ Correct Guess');
        addContent(number, randomNumber);
        successAttempts++;
        addContent(score, successAttempts);
        bgGreen(number);
      } else {
        //when user input and app generated number both are not equal
        addContent(number, '?');
        bgBlack(number);
        removeGreen(message);
        red(message);
        failedAttempts++;
        addContent(failed, failedAttempts);
        attempts--;
        addContent(attemptsLeft, attempts);
        //Following is the Ternary operator (If user input is greater than App generated number then show message 'Too High' else show 'Too Low')
        guess > randomNumber
          ? addContent(message, '🔴 Too High')
          : addContent(message, '🔴 Too Low');
      }
    } else {
      //When user input is not between 1 and 20 Show an Error message
      removeGreen(message);
      red(message);
      addContent(message, '🔴 Number should be between 1-20');
    }
  } else {
    //This is the else part of above condition if(attempts>0), In this else part, it means when there is no more attempts left then show an 'Game Over' message
    const gameOverAudio = new Audio('sound2.wav');
    gameOverAudio.play();
    removeGreen(message);
    red(message);
    addContent(message, 'Game Over!!!');
  }
});

// Event handller for Play Again button
document.querySelector('.again').addEventListener('click', () => {
  if (window.confirm('Are you sure to Play Again?')) resetGame();
});

//functions

//function for adding class 'red' to any HTML element
function red(element) {
  element.classList.add('red');
}
//function for adding class 'green' to any HTML element
function green(element) {
  element.classList.add('green');
}
//function for removing class 'red' from any HTML element
function removeRed(element) {
  element.classList.remove('red');
}
//function for removing class 'grenn' from any HTML element
function removeGreen(element) {
  element.classList.remove('green');
}
//function for adding textContent to any HTML element, it accepts 2 parameters, 1st the HTML element and 2nd the Text.
function addContent(element, message) {
  element.textContent = message;
}
//function for Play Again button functionality, that simply Reset the App/Game
function resetGame() {
  successAttempts = 0;
  failedAttempts = 0;
  attempts = 50;
  addContent(message, 'Start guessing...');
  addContent(failed, failedAttempts);
  addContent(score, successAttempts);
  addContent(attemptsLeft, attempts);
  addContent(number, '?');
  input.value = '';
  removeGreen(message);
  removeRed(message);
  bgBlack(number);
}
function bgGreen(element) {
  element.style.background = 'rgb(12, 187, 120)';
}
function bgBlack(element) {
  element.style.background = '#222325';
}
