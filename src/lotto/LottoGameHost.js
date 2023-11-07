import { LOTTO_REGEX, MESSAGE, ERROR_MESSAGE } from '../constant/constants.js';
import { getAndValidateInput } from '../utility/console.js';
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
  ];

  #isBonusNumberDuplicate(bonusNumber) {
    if (this.#winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.wrongBonusNumberInput);
    }
  }

  async setLottoWinningNumbers() {
    const winningNumbers = await getAndValidateInput(
      MESSAGE.winningNumbersInput,
      this.#winningNumbersValidationList,
    );
    this.#winningNumbers = winningNumbers.split(',').map(Number);

    const bonusNumber = await getAndValidateInput(
      MESSAGE.bonusNumberInput,
      this.#bonusNumberValidationList,
    );
    this.#bonusNumber = Number(bonusNumber);
  }

  getWinningNumbers() {
    return [...this.#winningNumbers];
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default LottoGameHost;
