import LottoGame from '../lotto/LottoGame.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { ERROR_MESSAGE, STORE_MESSAGE, RESULT_MESSAGE } from '../constant/ui.js';
import { LOTTO } from '../constant/lotto.js';

class UI {
  // #baseballGame = null;

  // constructor() {
  //   this.#baseballGame = new LottoGame();
  // }

  async getValidMoney(callback) {
    let moneyInput;

    while (true) {
      moneyInput = await InputView.readMoney();

      if (await callback(moneyInput)) break;

      OutputView.printText(ERROR_MESSAGE.wrongMoney);
    }

    return moneyInput;
  }

  async getValidLottoNumbers(callback) {
    let lottoNumbersInput;

    while (true) {
      lottoNumbersInput = await InputView.readLottoNumbers();

      if (await callback(lottoNumbersInput)) break;

      OutputView.printText(ERROR_MESSAGE.wrongLottoNumbers);
    }

    return lottoNumbersInput;
  }

  async getValidBonusNumber(callback, lottoNumbers) {
    let bonusNumberInput;

    while (true) {
      bonusNumberInput = await InputView.readBonusNumber();

      if (await callback(bonusNumberInput, lottoNumbers)) break;

      OutputView.printText(ERROR_MESSAGE.wrongBonusNumber);
    }

    return bonusNumberInput;
  }

  // 여기서 로또 출력하는 로직 만들어야 하나?
  displayLottoCount(lottoCount) {
    OutputView.printText(STORE_MESSAGE.formatCount(lottoCount));
  }

  displayResults(results) {
    OutputView.printText(RESULT_MESSAGE.resultTitle);
    Object.keys(LOTTO.rank)
      .reverse() // 등수에 따라 오름차순으로 정렬
      .forEach((rankNumber) => {
        const rank = LOTTO.rank[rankNumber];
        const count = results[rank.rankNumber] || 0;
        OutputView.printText(
          LOTTO.formatResult(rank.matched, rank.bonus, rank.prizeString, count),
        );
      });
  }

  displayRate(rate) {
    OutputView.printText(RESULT_MESSAGE.formatBenefitRate(rate));
  }
}

export default UI;
