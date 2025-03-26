'use strict';

//Selecting element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const textPlayer1 = document.querySelector('#name--0');
const textPlayer2 = document.querySelector('#name--1');
const player = document.querySelectorAll('.player');

const dice = document.querySelector('.dice');
dice.classList.add('hidden'); //hide the dice for now

//Secting btn to roll dice and hiold score
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Assigning different value
let totalScore0 = 0;
let totalScore1 = 0;
score0El.textContent = totalScore0;
score1El.textContent = totalScore1;
let currentScore = 0;

//Generating random dice roll
function diceValue() {
  return Math.trunc(Math.random() * 6) + 1;
}

//Display diceroll
function displayDice(diceValue) {
  dice.classList.remove('hidden');
  dice.src = `dice-${diceValue}.png`;
}

//checking what player--active
function checkActivePlayer() {
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

//Add current score to total score
function addCurrentScoreToTotal() {
  const activePlayer = checkActivePlayer();
  if (activePlayer === 1) {
    totalScore0 += currentScore;
    score0El.textContent = totalScore0;
    currentScore = 0;
    current0El.textContent = currentScore;
    switchPlayer();
  } else {
    totalScore1 += currentScore;
    score1El.textContent = totalScore1;
    currentScore = 0;
    current1El.textContent = currentScore;
    switchPlayer();
  }
}

//Define who is the winner
function defineWinner() {
  if (totalScore0 >= 100) {
    textPlayer1.style.color = '#c7365f';
    textPlayer1.style.fontWeight = '700';
    player1.classList.add('player--winner');
  } else if (totalScore1 >= 100) {
    textPlayer2.style.fontWeight = '700';
    textPlayer2.style.color = '#c7365f';
    player2.classList.add('player--winner');
    // console.log(totalScore1);
  }
}

//ROLLING THE DICE
btnRoll.addEventListener('click', function () {
  //See who is playing (Player 1 or 2)
  const activePlayer = checkActivePlayer();
  //Generating random dice roll
  const randomValue = diceValue();
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
  //Add current score to total score
  addCurrentScoreToTotal();
  defineWinner();
});

//START NEW GAME
btnNew.addEventListener('click', function () {
  totalScore0 = 0;
  totalScore1 = 0;
  score0El.textContent = totalScore0;
  current0El.textContent = totalScore0;
  score1El.textContent = totalScore1;
  current1El.textContent = totalScore1;
  currentScore = 0;
  dice.classList.add('hidden');

  for (let index = 0; index < player.length; index++) {
    const element = player[index];
    if (element.classList.contains('player--winner')) {
      element.classList.remove('player--winner');
    }
  }
});
