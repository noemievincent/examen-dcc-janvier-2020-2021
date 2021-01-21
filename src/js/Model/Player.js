class Player {
  constructor() {
    this.i_score = 0;
  }

  play() {
    this.i_score++;
  }

  get score() {
    return this.i_score;
  }

}

export default Player;