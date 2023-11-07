import Lotto from './Lotto.js';
import { Validator } from '../utility/validation.js';
import { pickUniqueNumbersInRange } from '../utility/random.js';
import { print, getAndValidateInput } from '../utility/console.js';
import {
  LOTTO_CONSTANT,
  LIMIT_CONSTANT,
  MESSAGE,
  ERROR_MESSAGE,
  FORMATTER,
} from '../constant/constants.js';

class LottoStore {
  #money = 0;

  #publishCount = 0;

  #validationList = [
    (input) =>
      Validator.isLengthWithinBounds(
        input,
        LIMIT_CONSTANT.minLimit,
        LIMIT_CONSTANT.lengthMaxLimit,
      ),
    Validator.isValidateNumber,
    (input) =>
      Validator.isNumberWithinBounds(
        Number(input),
        LIMIT_CONSTANT.minLimit,
        LIMIT_CONSTANT.numberMaxLimit,
      ),
    this.#isDivisibleBy1000,
  ];

  async setLottoStore() {
    const moneyInput = await getAndValidateInput(
      MESSAGE.moneyInput,
      this.#validationList,
    );
    this.#money = Number(moneyInput);

    this.#publishCount = this.#money / LOTTO_CONSTANT.minPrice;
    this.#printPublishCount();
  }

  #isDivisibleBy1000(money) {
    if (money % LOTTO_CONSTANT.minPrice !== 0) {
      throw new Error(ERROR_MESSAGE.wrongMoneyInput);
    }
  }

  #getLottoNumbers() {
    return pickUniqueNumbersInRange(
      LOTTO_CONSTANT.minInclusive,
      LOTTO_CONSTANT.maxInclusive,
      LOTTO_CONSTANT.numberCount,
    ).sort((a, b) => a - b);
  }

  #printPublishCount() {
    print(FORMATTER.publishCountFormatter(this.#publishCount));
  }

  #getMoney() {
    return this.#money;
  }

  publishLottos() {
    const publishedLottoList = [];

    Array(this.#publishCount)
      .fill()
      .forEach(() => {
        const lottoNumbers = this.#getLottoNumbers();
        const lotto = new Lotto(...lottoNumbers);
        // const lotto = new Lotto(Array.from(lottoNumbers));
        publishedLottoList.push(lotto);
      });

    return publishedLottoList.slice();
  }
}

export default LottoStore;
