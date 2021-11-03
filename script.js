
// all of the nine div elements on the screen, 
// converted to an array of html DOM elements
const boxes = Array.from(document.getElementsByClassName("box"));

// one player is "X" and the other is "0". 
// current player is either "X" or "0" and is what will be placed in the
// box when the current player plays his turn.
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

// whether the game is still in progress, so taking further moves.
// when we first start up it is true.
let inPlay = true;

// the text at the bottom where messages are displayed
const playText = document.getElementById("playText");

const restartGame = () => {

  inPlay = true;

  // set all the boxes on the screen back to empty - remove any "X" or "0"'s.
  for (let box of boxes) {
    setBoxText(box, '');
    box.classList.remove("box-o");
    box.classList.remove("box-x");
  }

  playText.innerHTML = `Let's Play!!`;

  // first player will be "0"
  currentPlayer = O_TEXT;
}

function setBoxText(box, text) {
  box.innerText=text;
}

function getBoxText(box) {
  return box.innerText;
}

function emptySquaresLeft() {
  for (let box of boxes) {
    if (box.innerText==='') {
      return true;
    }
  }

  return false;
}

function boxIsEmpty(box) {
  return box.innerText==='';
}

function onClickBox(event) {
  if (!inPlay) {
    return;
  }

  const boxEl = event.target;
  if (boxIsEmpty(boxEl)) {
    setBoxText(boxEl, currentPlayer);
    boxEl.classList.add(currentPlayer === O_TEXT?'box-o':'box-x');
    if (hasPlayerWon(currentPlayer)) {
      inPlay = false;
      playText.innerText = `${currentPlayer} wins!!`;
      return;
    }
    
    if (!emptySquaresLeft()) {
      inPlay = false;
      playText.innerText = "It's a draw!";
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
}

function threeInARow(first, second, third, player) {
  return (getBoxText(boxes[first])  === player && 
          getBoxText(boxes[second]) === player && 
          getBoxText(boxes[third] ) === player);
}

function hasPlayerWon(player) {
  // from top left, check across, down, and diagonal
  if (threeInARow(0, 1, 2, player)) return true;
  if (threeInARow(0, 3, 6, player)) return true;
  if (threeInARow(0, 4, 8, player)) return true;

   // from top right, check diagonal
   if (threeInARow(2, 4, 6, player)) return true;

  // from bottom check up and across
  if (threeInARow(8, 2, 5, player)) return true;
  if (threeInARow(8, 7, 6, player)) return true;

  // from middle check middle vertical and middle horizontal
  if (threeInARow(4, 3, 5, player)) return true;
  if (threeInARow(4, 1, 7, player)) return true;

  return false;
};

function setupEventHandlers() {
  for (let box of boxes) {
    box.addEventListener("click", onClickBox);
  }
  
  // the button at the top that the user clicks to start over
  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", restartGame);
}

setupEventHandlers();


