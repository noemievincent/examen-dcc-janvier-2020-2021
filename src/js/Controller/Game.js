import ui from '../View/ui';
import Board from '../Model/Board';
import {
  BUTTONS_CLASS_NAME,
  BUTTONS_RESET,
  MAX_TIME_SECONDS
} from '../settings'

class Game {
  constructor() {
    this.view = ui;
    this.data = new Board();
    this.view.init(this.data);
    this.timmer = null;
    this.timeLeft = MAX_TIME_SECONDS;
    document.addEventListener('click', (event) => {
      event.preventDefault();
      const targetClassList = event.target.classList;
      if (targetClassList.contains(BUTTONS_CLASS_NAME)) {
        this.play(event);
      } else if (targetClassList.contains(BUTTONS_RESET)) {
        this.reset();
      }
    });
  }

  reset() {
    this.timeLeft = MAX_TIME_SECONDS;
    this.data.init();
    this.view.clear();
  }

  play(event) {
    if (this.timmer == null) {
      // this.timeLeft is already displayed.
      this.timeLeft--;
      this.timmer = setInterval(() => this.countDown(), 1000);
    }

    if (!this.data.isWin) {
      this.data.player.play();
    }
    // the view returns the x,y position
    const position = this.view.play(event.target);
    this.data.gameBoard[position.x][position.y] = this.data.currentPlayerIdx;
    this.view.displayResult();
    const state = this.checkForWinner()
    if (state.isOver || state.isWin) {
      if (state.isWin) {
        this.view.highlightWinner(state.idx);
        console.log("Vous avez gané");
        this.view.displayWinForm(true);
      } else {
        console.log("Vous avez perdu");
        this.view.displayWinForm(false);
      }
      clearInterval(this.timmer);
      this.timmer = null;
      return;
    }
    this.data.next();
    this.view.displayNextPlayer();
  }

  checkForWinner() {
    const gb = this.data.gameBoard;
    // check lines
    if (gb[0][0] != null && gb[0][0] === gb[0][1] && gb[0][1] === gb[0][2]) {
      return { isOver: false, isWin: true, idx: [0, 1, 2] };
    }
    if (gb[1][0] != null && gb[1][0] === gb[1][1] && gb[1][1] === gb[1][2]) {
      return { isOver: false, isWin: true, idx: [3, 4, 5] };
    }
    if (gb[2][0] != null && gb[2][0] === gb[2][1] && gb[2][1] === gb[2][2]) {
      return { isOver: false, isWin: true, idx: [6, 7, 8] };
    }
    // check columns
    if (gb[0][0] != null && gb[0][0] === gb[1][0] && gb[1][0] === gb[2][0]) {
      return { isOver: false, isWin: true, idx: [0, 3, 6] };
    }
    if (gb[0][1] != null && gb[0][1] === gb[1][1] && gb[1][1] === gb[2][1]) {
      return { isOver: false, isWin: true, idx: [1, 4, 7] };
    }
    if (gb[0][2] != null && gb[0][2] === gb[1][2] && gb[1][2] === gb[2][2]) {
      return { isOver: false, isWin: true, idx: [2, 5, 8] };
    }
    // check diagonals
    if (gb[0][0] != null && gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
      return { isOver: false, isWin: true, idx: [0, 4, 8] };
    }
    if (gb[0][2] != null && gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
      return { isOver: false, isWin: true, idx: [2, 4, 6] };
    }
    // If the game is over
    console.log(this.data.players[0].score + this.data.players[1].score);
    if (this.data.players[0].score + this.data.players[1].score === 9) {
      return { isOver: true, isWin: false, idx: [] };
    }
    return { isOver: false, isWin: false, idx: [] };
  }

  countDown() {
    this.view.updateTimer(this.timeLeft--);
    if (this.timeLeft < 0) {
      clearInterval(this.timmer);
      this.timmer = null;
      console.log("Le temps s'est écoulé");
      this.view.displayWinForm(false);
    }
  }
}

export default Game;