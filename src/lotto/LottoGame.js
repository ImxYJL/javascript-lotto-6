import {
  isValidateMoney,
  isValidLottoNumbers,
  isValidBonusNumber,
} from '../validation/lotto.js';
import { LOTTO } from '../constant/lotto.js';
import LottoCenter from './LottoCenter.js';

class LottoGame {
  #money = 0;

  #count = 0;

  #lottoNumbers = [];

  #bonusNumber = 0;

  #results = {};

  #lottoCenter = null;

  constructor() {
    this.#lottoCenter = new LottoCenter();
  }

  isValidMoney(input) {
    return (
      isValidateMoney.isUnderMaxMoneyLimit(input) &&
      isValidateMoney.isDivisibleBy1000(input)
    );
  }

  isValidLottoNumbers(input) {
    return (
      isValidLottoNumbers.isInRange(input) &&
      isValidLottoNumbers.isNotDuplicated(input)
    );
  }

  isValidBonusNumber(input) {
    return (
      isValidBonusNumber.isInRange(input) &&
      isValidBonusNumber.isNotDuplicated(input, this.#lottoNumbers)
    );
  }

  countLottos() {
    const count = Number(this.#money) / LOTTO.price;
    this.#count = count;
    return count;
  }

  setMoney(moneyInput) {
    this.#money = Number(moneyInput);
  }

  setLottoNumbers(lottoNumbers) {
    this.#lottoNumbers = [...lottoNumbers];
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

  setResults(result) {
    this.#results = { ...result };
  }

  purchaseLottos() {
    Array(this.#count)
      .fill()
      .forEach(() => {
        this.#lottoCenter.publishLotto();
      });
  }

  displayLottos() {
    this.#lottoCenter.printAllLottos();
  }

  inspectResults() {
    this.#lottoCenter.inspectAllLottos([...this.#lottoNumbers], this.#bonusNumber);
    this.setResults(this.#lottoCenter.calculateResults());

    return this.#results;
  }

  calculateRate() {
    let totalPrize = 0;

    Object.keys(LOTTO.rank).forEach((rankNumber) => {
      const rank = LOTTO.rank[rankNumber];
      const count = this.#results[rank.rankNumber] || 0;
      totalPrize += count * rank.prize; // 당첨금 계산
    });

    const returnRate = (totalPrize / this.#money) * 100;
    return returnRate.toFixed(1);
  }
}

export default LottoGame;
