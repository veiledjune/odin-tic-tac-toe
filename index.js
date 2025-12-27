const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  const addMarker = (index) => {
    if (gameboardArr[index]) return;
    const playerTurn = playGame.getPlayerTurn();
    if (playerTurn) {
      gameboardArr[index] = 'X';
    } else gameboardArr[index] = 'O';
    playGame.updatePlayerTurn();
  };
  return { gameboardArr, addMarker };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const playGame = (() => {
  const gameboard = Gameboard.gameboardArr;
  let playerTurn = true;

  const getPlayerTurn = () => playerTurn;

  const updatePlayerTurn = () => (playerTurn = !playerTurn);

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombos) {
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      ) {
        console.log(`${gameboard[a]} wins`);
        return;
      }
    }
    if (gameboard.every((square) => square)) console.log('tie');
  };
  return { checkWin, getPlayerTurn, updatePlayerTurn };
})();

function render() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.textContent = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    div.addEventListener('click', () => Gameboard.addMarker(i));
    gameContainer.appendChild(div);
  }
}

render();
