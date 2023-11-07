import LottoCenter from './LottoCenter.js';
import LottoGameHost from './LottoGameHost.js';
import LottoStore from './LottoStore.js';
import { print } from '../utility/console.js';
import {
  LOTTO_CONSTANT,
  LOTTO_RANK,
  FORMATTER,
  MESSAGE,
} from '../constant/constants.js';

class LottoGame {
  // private?
  lottoStore = null;
  lottoGameHost = null;
  // freeze?
  reverseRankList = ['fifth', 'fourth', 'third', 'second', 'first'];

  constructor() {
    this.lottoStore = new LottoStore();
    this.lottoGameHost = new LottoGameHost();
  }

  #printResults(lottoResultsList) {
    this.reverseRankList.forEach((rank) => {
      const matchedNumber = LOTTO_RANK[rank].matchedNumber;
      const bonudNumberText = LOTTO_RANK[rank].bonudNumberText;
      const reward = LOTTO_RANK[rank].rewardText;
      const count = lottoResultsList[rank];

      print(
        resultsPrintFormatter(matchedNumber, bonudNumberText, reward, count),
      );
    });
  }

  // 나눌까말까
  calculateReturnRate(money, lottoResultsList) {
    let rewardSum = 0;
    this.reverseRankList.forEach((rank) => {
      const reward = LOTTO_RANK[rank].reward;
      const count = lottoResultsList[rank];
      rewardSum += reward * count;
    });

    const returnRate = (rewardSum / money) * LOTTO_CONSTANT.percentageFactor;
    return returnRate.toFixed(LOTTO_CONSTANT.roundingDigit);
  }

  printReturnRate(returnRate) {
    //const returnRate = this.calculateReturnRate();
    print(FORMATTER.returnRateFormatter(returnRate));
  }

  // 금액을 입력받고 로또를 발행
  readyToStart() {
    this.lottoStore.setLottoStore();
    this.LottoCenter = new LottoCenter(this.lottoStore.publishLottos());
  }

  async playLottoGame() {
    this.readyToStart();

    // 로또 당첨 번호들 세팅
    this.lottoGameHost.setLottoWinningNumbers();
    // 로또 당첨여부 조사
    this.LottoCenter.inspectLottoWinningStatus(
      this.lottoGameHost.getWinningNumbers,
      this.lottoGameHost.getBonusNumber,
    );

    // 리턴받은 결과를 바탕으로 결과 출력
    print(MESSAGE.titleForResults);
    print(FORMATTER.contour);
    const lottoResultsList = this.LottoCenter.getLottoResultsList();
    this.#printResults(lottoResultsList);

    // 수익률 출력
    const returnRate = calculateReturnRate(
      this.lottoStore.getMoney(),
      lottoResultsList,
    );
    this.#printResults(returnRate);
  }
}

export default LottoGame;
