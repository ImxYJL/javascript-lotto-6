import Lotto from '../src/lotto/Lotto.js';
import LottoCenter from '../src/lotto/LottoCenter.js';
import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE } from '../src/constant/constants.js';

describe('LottoCenter 클래스 테스트', () => {
  let lottoCenter = null;
  let publishedLottoList = null;

  beforeEach(() => {
    publishedLottoList = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([7, 8, 9, 10, 11, 12]),
      new Lotto([13, 14, 15, 16, 17, 18]),
    ];
    lottoCenter = new LottoCenter(publishedLottoList);
  });

  test('LottoCenter 생성자 작동 테스트', () => {
    expect(lottoCenter).toBeInstanceOf(LottoCenter);
  });

  test('inspectLottoWinningStatus와 getLottoResultsList 작동 테스트', () => {
    lottoCenter.inspectLottoWinningStatus([1, 2, 3, 4, 5, 6], 7);
    expect(lottoCenter.getLottoResultsList()).toEqual({
      first: 1,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    });
  });
});
