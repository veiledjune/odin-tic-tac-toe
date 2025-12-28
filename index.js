const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  const addMarker = (index, marker) => {
    if (gameboardArr[index]) return;
    gameboardArr[index] = marker;
  };
  const getBoard = () => gameboardArr;
  const resetBoard = () => gameboardArr.fill('');
  return { getBoard, addMarker, resetBoard };
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

  const getPlayers = () => playersObject;

  return { createPlayers, getPlayers };
})();

const playGame = (() => {
  const gameboard = Gameboard.getBoard();

  const gameStatus = { gameActive: false, playerTurn: true };

  const getGameStatus = () => gameStatus;

  const startGame = () => {
    const playerOne = handlePlayers.getPlayers().playerOne;
    gameStatus.gameActive = true;
    gameStatus.playerTurn = true;
    render.updateResult(`${playerOne.name}'s Turn`);
  };

  const toggleGameActive = () => {
    gameStatus.gameActive = !gameStatus.gameActive;
  };

  const updatePlayerTurn = () => {
    gameStatus.playerTurn = !gameStatus.playerTurn;
  };

  const checkWin = () => {
    if (!gameStatus.gameActive) return;
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
      )
        return gameboard[a];
    }
    if (gameboard.every((square) => square)) return 'Tie';
    return null;
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
    const gameboard = Gameboard.getBoard();
    const gameContainer = document.querySelector('.game-container');
    gameContainer.textContent = '';
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.classList.add('square');
      div.textContent = gameboard[i];
      div.addEventListener('click', () => {
        const gameStatus = playGame.getGameStatus();
        const gameIsActive = gameStatus.gameActive;
        if (!gameIsActive) return;
        const players = handlePlayers.getPlayers();
        const playerOne = players.playerOne;
        const playerTwo = players.playerTwo;
        const currentPlayer = gameStatus.playerTurn ? playerOne : playerTwo;
        Gameboard.addMarker(i, currentPlayer.marker);
        renderBoard();
        const result = playGame.checkWin();
        if (result) {
          playGame.toggleGameActive();
          if (result === currentPlayer.marker) {
            return updateResult(`${currentPlayer.name} Wins!`);
          } else if (result === 'Tie') return updateResult(`Tie!`);
        } else {
          if (gameStatus.playerTurn) {
            updateResult(`${playerTwo.name}'s Turn`);
          } else updateResult(`${playerOne.name}'s Turn`);
          playGame.updatePlayerTurn();
        }
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
    }
    playButton.textContent = 'Restart';
    handlePlayers.createPlayers();
    playGame.startGame();
  });
}

events();

render.renderBoard();
