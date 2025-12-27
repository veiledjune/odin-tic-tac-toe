const Gameboard = (() => {
  const gameboardArr = ['o', 'o', 'o', 'o', 'x', 'x', 'x', 'o', 'o'];
  return { gameboardArr };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const playGame = (() => {
  const gameboard = Gameboard.gameboardArr;

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
  return { checkWin };
})();

function render() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.textContent = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    gameContainer.appendChild(div);
  }
}

render();
