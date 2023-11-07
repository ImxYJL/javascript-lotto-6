import LottoGame from './lotto/LottoGame';

class App {
  async play() {
    const lottoGame = new LottoGame();
    lottoGame.play();
  }
}

export default App;
