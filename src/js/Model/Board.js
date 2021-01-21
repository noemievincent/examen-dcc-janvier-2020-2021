import Player from './Player';

class Board {
  constructor() {
    this.init();
    this.i_Iidx = 0;
  }

  init() {
    this.a_players = [new Player(), new Player()];
    this.a_gameBoard = [[null, null, null], [null, null, null], [null, null, null]];
  }

  get currentPlayerIdx() {
    return this.i_Iidx;
  }

  get players() {
    return this.a_players;
  }

  get player() {
    return this.players[this.currentPlayerIdx];
  }

  next() {
    // toggle 0:1
    this.i_Iidx = 1 - this.i_Iidx;
  }

  get gameBoard() {
    return this.a_gameBoard;
  }

}

export default Board;