const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  return { gameboardArr };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const playGame = (() => {
  const gameboard = Gameboard.gameboardArr;
})();
