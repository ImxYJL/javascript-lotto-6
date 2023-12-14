import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE, STORE_MESSAGE } from '../constant/ui.js';
import { isNumber, isValidLottoNumbersFormat } from '../validation/ui.js';

const InputView = {
  async readMoney() {
    const moneyInput = await Console.readLineAsync(STORE_MESSAGE.getMoney);

    if (!moneyInput || !isNumber(moneyInput)) {
      Console.print(ERROR_MESSAGE.wrongMoney);
      return this.readMoney();
    }

    return moneyInput;
  },

  async readLottoNumbers() {
    const lottoNumbersInput = await Console.readLineAsync(
      STORE_MESSAGE.getLottoNumbers,
    );

    if (!lottoNumbersInput || !isValidLottoNumbersFormat(lottoNumbersInput)) {
      Console.print(`${ERROR_MESSAGE.wrongLottoNumbers}`);
      return this.readLottoNumbers();
    }

    return lottoNumbersInput;
  },

  async readBonusNumber() {
    const bonusNumberInput = await Console.readLineAsync(
      STORE_MESSAGE.getBounsNumber,
    );

    if (!bonusNumberInput || !isNumber(bonusNumberInput)) {
      Console.print(`${ERROR_MESSAGE.wrongBonusNumber}`);
      return this.readBonusNumber();
    }

    return bonusNumberInput;
  },
};

export default InputView;
