'use strict';

//Recuperation des bouton
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
//Initialisation des variables globaux

let scores, currentScore, activePlayer, playing, maxScore;

//Initialisation

function init() {
  scores = [0, 0]; //score de jouer 1 et 2
  document.querySelector(`#score--0`).textContent = scores[0]; //initialisation de jouer 1
  document.querySelector(`#score--1`).textContent = scores[1]; //initialisation de jouer 2
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  maxScore = 20;

  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  diceImg.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
}
init();

//Generating random dice roll
function rollDice() {
  return Math.trunc(Math.random() * 6) + 1;
}

//Display Dice
function displayDice(dice) {
  diceImg.src = `dice-${dice}.png`;
  diceImg.classList.remove('hidden');
}

//Swicthplayer function
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}

//Show score of current player
function showScore(playerActive) {
  document.querySelector(`#score--${playerActive}`).textContent =
    scores[playerActive];
}

//Define player
function defineWinner(playerActive) {
  document
    .querySelector(`.player--${playerActive}`)
    .classList.add('player--winner');
  playing = false;
}

//USER ROLLS DICE
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating random dice roll
    const dice = rollDice();

    //Display Dice roll
    displayDice(dice);

    if (dice !== 1) {
      //Add dice roll to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Swicth player
      switchPlayer();
    }
  }
});

//USER HOLDS SCORE
btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  if (scores[activePlayer] < maxScore) {
    showScore(activePlayer);
    switchPlayer();
  } else {
    //Define winner
    defineWinner(activePlayer);
    showScore(activePlayer)
  }
});

//USE RESET GAMES
btnNew.addEventListener('click', init);
