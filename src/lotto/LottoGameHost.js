import { LOTTO_REGEX, MESSAGE, ERROR_MESSAGE } from '../constant/constants.js';
import { print, getAndValidateInput } from '../utility/console.js';
import { Validator } from '../utility/validation.js';

class LottoGameHost {
  #winningNumbers = [];

  #bonusNumber = 0;

  #winningNumbersValidationList = [
    (input) => Validator.isMatchingRegex(input, LOTTO_REGEX.lottoNumberInput),
  ];

  #bonusNumberValidationList = [
    (input) => Validator.isMatchingRegex(input, LOTTO_REGEX.bonusNumberInput),
    (input) => this.#isBonusNumberDuplicate(Number(input)),
    // this.#isBonusNumberDuplicate(Number(input)),
  ];

  #isBonusNumberDuplicate(bonusNumber) {
    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.wrongBonusNumberInput);
    }
  }

  async setLottoWinningNumbers() {
    this.#winningNumbers = await getAndValidateInput(
      MESSAGE.lottoNumberInput,
      this.#winningNumbersValidationList,
    ).map(Number);

    const bonusNumber = await getAndValidateInput(
      MESSAGE.bonusNumberInput,
      this.#bonusNumberValidationList,
    );
    this.#bonusNumber = Number(bonusNumber);
  }

  getWinningNumbers() {
    return this.#winningNumbers.splice();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default LottoGameHost;
