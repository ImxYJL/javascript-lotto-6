import LottoGame from './lotto/LottoGame.js';

class App {
  async play() {
    const lottoGame = new LottoGame();
    await lottoGame.playLottoGame();
  }
}

export default App;

// import LottoGame from '..src/lotto/LottoGame.js';
// import LottoCenter from '..src/lotto/LottoCenter.js';
// import LottoGameHost from './LottoGameHost.js';
// import LottoStore from '..src/lotto/LottoStore.js';
// import { print } from './utility/console.js';
// import {
//   LOTTO_CONSTANT,
//   LOTTO_RANK,
//   FORMATTER,
//   MESSAGE,
// } from '../constant/constants.js';

// class App {
//   lottoStore = null;
//   lottoGameHost = null;
//   lottoCenter = null;
//   lottoGame = null;

//   constructor() {
//     this.lottoStore = new LottoStore();
//     this.lottoGameHost = new LottoGameHost();
//     this.lottoGame = new LottoGame();
//   }

//   async play() {
//     // await this.lottoGame.pla

//   }
// }

// export default App;
