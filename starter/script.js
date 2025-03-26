'use strict';

//Selecting element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const dice = document.querySelector('.dice');
dice.classList.add('hidden'); //hide the dice for now

//Secting btn to roll dice and hiold score
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Assigning different value
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;

//Generating random dice roll
function diceValue() {
  return Math.trunc(Math.random() * 6) + 1;
}

//Display diceroll
function displayDice(diceValue) {
  const dice = document.querySelector('.dice');
  dice.classList.remove('hidden');
  dice.setAttribute('src', `dice-${diceValue}.png`);
}

//checking what player--active
function checkActivePlayer() {
  const player = document.querySelectorAll('.player');
  for (let index = 0; index < player.length; index++) {
    const element = player[index];
    if (element.classList.contains('player--active')) {
      return element.classList.contains('player--0') ? 1 : 2;
    }
  }
}

//Swicthing player
function switchPlayer() {
  const activePlayer = checkActivePlayer();
  const player1 = document.querySelector('.player--0');
  const player2 = document.querySelector('.player--1');
  if (activePlayer === 1) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
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

//ROLLING THE DICE
btnRoll.addEventListener('click', function () {
  //Selecting currentscore element
  const current0El = document.querySelector('#current--0');
  const current1El = document.querySelector('#current--1');

  //See who is playing (Player 1 or 2)
  const activePlayer = checkActivePlayer();
  console.log('Active player : ' + activePlayer);

  //Generating random dice roll
  const randomValue = diceValue();
  console.log('Dice value : ' + randomValue);

  //display dice roll (Image)
  displayDice(randomValue);

  //is dice value 1 ?
  if (randomValue !== 1) {
    //Incremmenting current score
    currentScore += randomValue;

    //Add dice roll to current value of active player
    activePlayer === 1
      ? (current0El.textContent = currentScore)
      : (current1El.textContent = currentScore);
  }
  //Switch to another player
  else {
    //swicth player
    switchPlayer();

    //Initialize current score
    currentScore = 0;
    activePlayer === 1
      ? (current0El.textContent = currentScore)
      : (current1El.textContent = currentScore);
  }
});

//HOLDING SCORE
btnHold.addEventListener('click', function () {
  const activePlayer = checkActivePlayer();
  //Add current to Scoret value of active player
  activePlayer === 1
    ? (score0El.textContent = currentScore)
    : (score1El.textContent = currentScore);
});
