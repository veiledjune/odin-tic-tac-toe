const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  const addMarker = (index) => {
    const playerOneTurn = gameStatus.playerTurn;
    const gameStatus = playGame.getGameStatus();
    const gameIsActive = gameStatus.gameActive;
    if (gameboardArr[index]) return;
    if (!gameIsActive) return;
    if (playerOneTurn) {
      gameboardArr[index] = 'X';
      playGame.checkWin();
    } else {
      gameboardArr[index] = 'O';
      playGame.checkWin();
    }
    playGame.updatePlayerTurn();
  };
  const resetBoard = () => gameboardArr.fill('');
  return { gameboardArr, addMarker, resetBoard };
})();

const handlePlayers = (() => {
  const playersObject = {};
  function createPlayers() {
    const playerOne = document.getElementById('player-one').value;
    const playerTwo = document.getElementById('player-two').value;
    playersObject.playerOne = {
      name: playerOne,
      marker: 'X',
    };
    playersObject.playerTwo = {
      name: playerTwo,
      marker: 'O',
    };
  }
  return { playersObject, createPlayers };
})();

const playGame = (() => {
  const gameboard = Gameboard.gameboardArr;

  const gameStatus = { gameActive: false, playerTurn: true };

  const getGameStatus = () => gameStatus;

  const startGame = () => {
    gameStatus.gameActive = true;
    gameStatus.playerTurn = true;
  };

  const toggleGameActive = () => {
    gameStatus.gameActive = !gameStatus.gameActive;
  };

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
        render.updateResult(`Player ${gameboard[a]} Wins`);
        toggleGameActive();
        return;
      }
    }
    if (gameboard.every((square) => square)) {
      toggleGameActive();
      render.updateResult('Tie');
    }
  };
  return {
    checkWin,
    getGameStatus,
    updatePlayerTurn,
    toggleGameActive,
    startGame,
  };
})();

const render = (() => {
  const renderBoard = () => {
    const gameboard = Gameboard.gameboardArr;
    const gameContainer = document.querySelector('.game-container');
    gameContainer.textContent = '';
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.classList.add('square');
      div.textContent = gameboard[i];
      div.addEventListener('click', () => {
        Gameboard.addMarker(i);
        renderBoard();
      });
      gameContainer.appendChild(div);
    }
  };

  const updateResult = (msg) => {
    const displayElement = document.querySelector('.result-msg');
    displayElement.textContent = msg;
  };
  return { renderBoard, updateResult };
})();

function events() {
  const form = document.querySelector('form');
  const playButton = document.querySelector('.play-btn');
  playButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (playButton.textContent === 'Restart') {
      Gameboard.resetBoard();
      render.renderBoard();
      playGame.startGame();
      handlePlayers.createPlayers();
    }
    playButton.textContent = 'Restart';
    playGame.startGame();
    handlePlayers.createPlayers();
  });
}

events();

render.renderBoard();
