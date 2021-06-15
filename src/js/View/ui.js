import {
  PLAYER_SUFFIX,
  NO_JS_MESSAGE,
  TIMER,
  JS_ENABLED,
  CLASS_NAME_FOR_PLAYER_ITEM,
  CLASS_NAME_FOR_PLAYER_RESULT,
  CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE,
  CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE_FORM,
  CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE_LOST,
  ID_APP,
  ITEM_ELEMENT,
  MAX_TIME_SECONDS,
  WINNER,
} from '../settings'


const ui = {
  init(data) {
    this.data = data;
    this.items = [];
    this.resultsElements = [document.querySelector('.' + CLASS_NAME_FOR_PLAYER_RESULT[0]), document.querySelector('.' + CLASS_NAME_FOR_PLAYER_RESULT[1])];
    this.resultsText = [this.resultsElements[0].textContent, this.resultsElements[1].textContent];
    document.documentElement.classList.add(JS_ENABLED);
    this.timer = document.querySelector(`.${TIMER}`);
    document.querySelector(`.${NO_JS_MESSAGE}`).remove();
    this.js_win_forms = [document.querySelector(`.${CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE}--${PLAYER_SUFFIX[0]}`), document.querySelector(`.${CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE}--${PLAYER_SUFFIX[1]}`), document.querySelector(`.${CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE_LOST}`)]
    this.buildButtons();
    this.updateTimer(MAX_TIME_SECONDS);
  },
  clear() {
    for (const item of this.items) {
      item.classList.remove(...[...CLASS_NAME_FOR_PLAYER_ITEM, WINNER]);
    }
    this.app.classList.remove(...PLAYER_SUFFIX);
    this.resultsElements.forEach((element, idx) => {
      element.textContent = this.resultsText[idx];
    })
    this.updateTimer(MAX_TIME_SECONDS);
    document.querySelector(`.${CLASS_NAME_FOR_PLAY_AGAIN_TEMPLATE_FORM}`).remove();
    this.data.next();
    this.app.classList.add(PLAYER_SUFFIX[this.data.currentPlayerIdx]);
  },
  buildButtons() {
    this.app = document.getElementById(ID_APP);
    this.app.classList.add(PLAYER_SUFFIX[this.data.currentPlayerIdx]);
    for (let i = 1; i < 10; i++) {
      this.app.insertAdjacentHTML('beforeend', ITEM_ELEMENT);
      this.items.push(this.app.lastChild);
    }
  },
  play(target) {
    if (target.classList.contains(CLASS_NAME_FOR_PLAYER_ITEM[0]) || target.classList.contains(CLASS_NAME_FOR_PLAYER_ITEM[1])) {
      return
    }
    target.classList.add(CLASS_NAME_FOR_PLAYER_ITEM[this.data.currentPlayerIdx]);
    return this.arrayPosition[this.items.findIndex(item => item === target)];
  },
  displayNextPlayer() {
    this.app.classList.remove(...PLAYER_SUFFIX);
    this.app.classList.add(PLAYER_SUFFIX[this.data.currentPlayerIdx]);
  },
  highlightWinner(winnerIdx) {
    for (const winnerIdx1 of winnerIdx) {
      this.items[winnerIdx1].classList.add(WINNER);
    }
  },
  displayWinForm(winner) {
    if (!winner) {
      document.body.append(document.importNode(this.js_win_forms[2].content, true));
    } else {
      document.body.append(document.importNode(this.js_win_forms[this.data.currentPlayerIdx].content, true));
    }
  },
  displayResult() {
    this.resultsElements[this.data.currentPlayerIdx].textContent = this.resultsText[this.data.currentPlayerIdx] + this.data.player.score;
  },
  arrayPosition: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ],
  updateTimer(timeLeft) {
    this.timer.textContent = this.timeToText(timeLeft);
  },
  timeToText(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const secondes = Math.floor(timeLeft % 60);
    return `${minutes < 10 ? "0" + minutes : minutes} : ${secondes < 10 ? "0" + secondes : secondes}`;
  }
}
export default ui;
