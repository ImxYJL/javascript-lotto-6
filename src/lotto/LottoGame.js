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
  lottoCenter = null;

  constructor() {
    this.lottoStore = new LottoStore();
    this.lottoGameHost = new LottoGameHost();
  }

  printResults(lottoResultsList) {
    LOTTO_CONSTANT.reverseRankList.forEach((rank) => {
      const matchedNumber = LOTTO_RANK[rank].matchedNumber;
      const bonudNumberText = LOTTO_RANK[rank].bonudNumberText;
      const reward = LOTTO_RANK[rank].rewardText;
      const count = lottoResultsList[rank];

      print(
        FORMATTER.resultsPrintFormatter(
          matchedNumber,
          bonudNumberText,
          reward,
          count,
        ),
      );
    });
  }

  // 나눌까말까
  calculateReturnRate(money, lottoResultsList) {
    let rewardSum = 0;
    LOTTO_CONSTANT.reverseRankList.forEach((rank) => {
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

  calculateAndPrintResults() {
    this.lottoCenter.inspectLottoWinningStatus(
      this.lottoGameHost.getWinningNumbers(),
      this.lottoGameHost.getBonusNumber(),
    );

    // 리턴받은 결과를 바탕으로 결과 출력
    print(MESSAGE.titleForResults);
    const lottoResultsList = this.lottoCenter.getLottoResultsList();
    this.printResults(lottoResultsList);
  }

  calculateAndPrintReturnRate(lottoResultsList) {
    const returnRate = this.calculateReturnRate(
      this.lottoStore.getMoney(),
      lottoResultsList,
    );
    this.printReturnRate(returnRate);
  }

  // 금액을 입력받고 로또를 발행
  async buyAndIssueLottos() {
    await this.lottoStore.setLottoStore();
    this.lottoCenter = new LottoCenter(this.lottoStore.publishLottos());
    this.lottoCenter.tryPrintAllLottoNumbers();
  }

  async playLottoGame() {
    await this.buyAndIssueLottos();

    // 로또 당첨 번호들 세팅
    await this.lottoGameHost.setLottoWinningNumbers();

    this.calculateAndPrintResults();
    this.calculateAndPrintReturnRate(this.lottoCenter.getLottoResultsList());
  }
}

export default LottoGame;
