const Gameboard = (() => {
  const gameboardArr = ['', '', '', '', '', '', '', '', ''];
  return { gameboardArr };
})();

function createPlayer(name, marker) {
  return { name, marker };
}
