import UI from './ui/UI.js';
import LottoGame from './lotto/LottoGame.js';
import { parseNumbers } from './utility/utilities.js';

class App {
  #ui = null;

  #lottoGame = null;

  constructor() {
    this.#ui = new UI();
    this.#lottoGame = new LottoGame();
  }

  async #startGame() {
    const moneyInput = await this.#ui.getValidMoney(this.#lottoGame.isValidMoney);
    this.#lottoGame.setMoney(moneyInput);
    this.#ui.displayLottoCount(this.#lottoGame.countLottos(moneyInput));
    this.#lottoGame.purchaseLottos();
    this.#lottoGame.displayLottos();
  }

  async #setWinningNumbers() {
    const lottoNumbersInput = await this.#ui.getValidLottoNumbers(
      this.#lottoGame.isValidLottoNumbers,
    );

    this.#lottoGame.setLottoNumbers(parseNumbers(lottoNumbersInput));

    const bonusNumberInput = await this.#ui.getValidBonusNumber(
      this.#lottoGame.isValidBonusNumber.bind(this.#lottoGame),
      parseNumbers(lottoNumbersInput),
    );

    this.#lottoGame.setBonusNumber(Number(bonusNumberInput));
  }

  async play() {
    await this.#startGame();
    await this.#setWinningNumbers();

    this.#ui.displayResults(this.#lottoGame.inspectResults());
    this.#ui.displayRate(this.#lottoGame.calculateRate());
  }
}

export default App;
