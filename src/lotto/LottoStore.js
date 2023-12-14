import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

class LottoStore {
  publishLotto() {
    const newLottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    const newLotto = new Lotto([...newLottoNumber]);
    this.#lottoList.push(newLotto);
  }
}

export default LottoStore;
