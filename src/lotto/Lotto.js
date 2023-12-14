import { Console } from '@woowacourse/mission-utils';
import { formatArray } from '../utility/utilities.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복되지 않아야 합니다.');
    }
  }

  printNumbers() {
    Console.print(formatArray(this.#numbers));
  }

  getResult(lottoNumbers, bonusNumber) {
    const countMatchedNumbers = this.#numbers.filter((number) =>
      lottoNumbers.includes(number),
    ).length;
    const isBonusIncluded = this.#numbers.includes(bonusNumber);

    if (countMatchedNumbers === 6) return 1;
    if (countMatchedNumbers === 5 && isBonusIncluded) return 2;
    if (countMatchedNumbers === 5) return 3; // 3
    if (countMatchedNumbers === 4) return 4; // 4등
    if (countMatchedNumbers === 3) return 5; // 5등

    return 0; // 당첨되지 않음
  }
}

export default Lotto;
