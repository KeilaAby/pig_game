'use strict';

//Selecting element

const dice = document.querySelector('.dice');
dice.classList.add('hidden'); //hide the dice for now
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//Assigning different value
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;

//Generating random dice roll
function diceValue() {
  Math.trunc(Math.random() * 6) + 1;
}

//Display diceroll
function displayDice(diceValue) {
  dice.classList.remove('hidden');
  const diceImage = dice.attributes['src'];
  switch (diceValue) {
    case 1:
      diceImage = 'dice-1.png';
      break;
    case 2:
      diceImage = 'dice-2.png';
      break;
    case 3:
      diceImage = 'dice-3.png';
      break;
    case 4:
      diceImage = 'dice-4.png';
      break;
    case 5:
      diceImage = 'dice-5.png';
      break;
    case 6:
      diceImage = 'dice-6.png';
      break;
    default:
  }
}

//Userrollds dice - What user ? 0 or 1

//checking if is a player--active
function checkActivePlayer() {
  const player = document.querySelectorAll('.player');
  for (let index = 0; index < player.length; index++) {
    const element = player[index];
    if (element.classList.contains('player--active')) {
      if (element.classList.contains('player--0')) {
        return 0;
      } else {
        return 1;
      }
    }
  }
}

//Displaying new Score
function displayScore(currentScore) {
  const score0El = document.querySelector('#score--0');
  const score1El = document.querySelector('#score--1');
  if (checkActivePlayer === 0) {
    score0El.textContent = currentScore;
  } else {
    score1El.textContent = currentScore;
  }
}
