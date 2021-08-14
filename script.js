const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
let spaces = [];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;
let inPlay = true;

const initGame = () => {
  spaces = [null, null, null, null, null, null, null, null, null];

  inPlay = true;
  boxes.forEach((box) => {
    box.innerText = "";
  });

  playText.innerHTML = `Let's Play!!`;
  currentPlayer = O_TEXT;
}

const drawBoard = () => {
  boxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (!inPlay) return;
      const id = e.target.id;
      if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        e.target.classList.add(currentPlayer === O_TEXT?'box-o':'box-x');
        if (hasPlayerWon(currentPlayer)) {
          inPlay = false;
          playText.innerHTML = `${currentPlayer} wins!!`;
          return;
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
      }
    });
  });
};

const threeInARow = (first, second, third, player) => {
  return (spaces[first]  === player && 
          spaces[second] === player && 
          spaces[third]  === player);
}

const hasPlayerWon = (player) => {
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

restartBtn.addEventListener("click", () => {
  initGame();
});

drawBoard();
