const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  const addMarker = (index) => {
    const gameStatus = playGame.getGameStatus();
    if (gameboardArr[index]) return;
    if (!gameStatus.gameActive) return;
    if (gameStatus.playerTurn) {
      gameboardArr[index] = 'X';
      playGame.checkWin();
    } else {
      gameboardArr[index] = 'O';
      playGame.checkWin();
    }
    playGame.updatePlayerTurn();
  };
  return { gameboardArr, addMarker };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const playGame = (() => {
  const gameboard = Gameboard.gameboardArr;

  const gameStatus = { gameActive: true, playerTurn: true };

  const getGameStatus = () => gameStatus;

  const updatePlayerTurn = () => {
    gameStatus.playerTurn = !gameStatus.playerTurn;
    console.log(gameStatus.playerTurn);
  };

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
        gameStatus.gameActive = false;
        return;
      }
    }
    if (gameboard.every((square) => square)) {
      gameStatus.gameActive = false;
      console.log('tie');
    }
  };
  return { checkWin, getGameStatus, updatePlayerTurn };
})();

function render() {
  const gameboard = Gameboard.gameboardArr;
  const gameContainer = document.querySelector('.game-container');
  gameContainer.textContent = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    div.textContent = gameboard[i];
    div.addEventListener('click', () => {
      Gameboard.addMarker(i);
      render();
    });
    gameContainer.appendChild(div);
  }
}

render();
