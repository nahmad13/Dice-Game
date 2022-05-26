"use stritct";

// slecting elements
const scorep1el = document.getElementById("score--0");
const scorep2el = document.getElementById("score--1");
const current0el = document.getElementById("current--0");
const current1el = document.getElementById("current--1");
const diceel = document.querySelector(".dice");
const btnNames = document.querySelector(".btn--names");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const pl0el = document.querySelector(".player--0");
const pl1el = document.querySelector(".player--1");
const p0name = document.getElementById("name--0").textContent;
const p1name = document.getElementById("name--1").textContent;
const input = document.querySelector(".final-score");

let scores, currentScore, activePlayer, playing, winningScore, finalScore;
// initial values

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById("name--0").textContent = p0name;
  document.getElementById("name--1").textContent = p1name;
  finalScore = input.value = "";

  scorep1el.textContent = 0;
  scorep2el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  input.classList.remove("hidden");
  diceel.classList.add("hidden");
  pl0el.classList.remove("player--winner");
  pl1el.classList.remove("player--winner");
  pl0el.classList.add("player--active");
  pl1el.classList.remove("player--active");
  btnNames.classList.remove("hidden");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle removes or add class if it is not there or remove it if it is there
  pl0el.classList.toggle("player--active");
  pl1el.classList.toggle("player--active");
};

//Rolling DICE
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceel.classList.remove("hidden");
    diceel.src = `assets/images/dice-${dice}.svg`;
    finalScore = input.value;
    input.classList.add("hidden");
    btnNames.classList.add("hidden");
    //check if 1 thencurrent0el
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //then swtich players
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    //adding current score to active player
    // scores[1] = scores[1] + currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check score >=100

    if (finalScore) {
      winningScore = finalScore;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      playing = false;
      diceel.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    //end game
    //switch player
    else switchPlayer();
  }
});

btnNew.addEventListener("click", init);

// btnNew.addEventListener("click", function () {
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove("player--winner");
//   playing = true;
//   activePlayer = 0;
//   scores = [0, 0];
//   document.getElementById(`score--0`).textContent = scores[0];
//   document.getElementById(`score--1`).textContent = scores[1];
//   currentScore = 0;
//   document.getElementById(`current--0`).textContent = currentScore;
//   document.getElementById(`current--1`).textContent = currentScore;
//   diceel.classList.add("hidden");
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.add("player--active");
// });

btnNames.addEventListener("click", function () {
  p0NewName = prompt("Enter player 1 Name : ");
  document.getElementById("name--0").textContent = p0NewName;
  p1NewName = prompt("Enter player 2 Name : ");
  document.getElementById("name--1").textContent = p1NewName;
  btnNames.classList.add("hidden");
});
