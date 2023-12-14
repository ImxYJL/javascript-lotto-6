import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class LottoCenter {
  #lottoList = [];

  #lottoResultList = [];

  publishLotto() {
    const newLottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    const newLotto = new Lotto([...newLottoNumber].sort((a, b) => a - b));
    this.#lottoList.push(newLotto);
  }

  printAllLottos() {
    this.#lottoList.forEach((lotto) => {
      lotto.printNumbers();
    });
  }

  inspectAllLottos(lottoNumbers, bonusNumber) {
    this.#lottoList.forEach((lotto) => {
      this.#lottoResultList.push(lotto.getResult(lottoNumbers, bonusNumber));
    });
  }

  calculateResults() {
    const result = this.#lottoResultList.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    return result;
  }
}

export default LottoCenter;
