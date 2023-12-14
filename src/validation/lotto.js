import { MAX_MONEY_LIMIT } from '../constant/ui.js';
import { LOTTO } from '../constant/lotto.js';

export const isValidateMoney = {
  isUnderMaxMoneyLimit(money) {
    return Number(money) < MAX_MONEY_LIMIT;
  },

  isDivisibleBy1000(money) {
    return Number(money) % LOTTO.price === 0;
  },
};

export const isValidLottoNumbers = {
  isInRange(lottoNumbers) {
    return lottoNumbers
      .split(',')
      .map(Number)
      .every((num) => num >= 1 && num <= 45);
  },
  isNotDuplicated(lottoNumbers) {
    const temp = lottoNumbers.split(',').map(Number);
    return new Set(temp).size === temp.length;
  },
};

export const isValidBonusNumber = {
  isInRange(bonusNumberInput) {
    const bonusNumber = Number(bonusNumberInput);
    return bonusNumber <= 45 && bonusNumber >= 1;
  },
  isNotDuplicated(bonusNumberInput, lottoNumbers) {
    const bonusNumber = Number(bonusNumberInput);
    return !lottoNumbers.includes(bonusNumber);
  },
};
