import Lotto from '../src/lotto/Lotto.js';
import LottoCenter from '../src/lotto/LottoCenter.js';

describe('LottoCenter 클래스 테스트', () => {
  let publishedLottoList;
  let lottoCenter;

  beforeEach(() => {
    const lottoCount = 5;
    // 5개의 로또를 가정하고, 각 로또는 getRank 메소드를 가지고 있으며, 이 메소드는 순위를 반환한다.
    publishedLottoList = Array(lottoCount)
      .fill()
      .map(() => {
        const numbers = [1, 2, 3, 4, 5, 6]; // 임의의 로또 번호
        const lotto = new Lotto(numbers); // 생성자에 numbers 전달
        lotto.getRank = jest.fn().mockReturnValue('fifth');
        return lotto;
      });

    lottoCenter = new LottoCenter(publishedLottoList);
  });

  test('tryPrintAllLottoNumbers 메소드가 각 로또의 printNumbers 메소드를 호출하는지 테스트', () => {
    publishedLottoList.forEach((lotto) => {
      lotto.printNumbers = jest.fn();
    });

    lottoCenter.tryPrintAllLottoNumbers();

    publishedLottoList.forEach((lotto) => {
      expect(lotto.printNumbers).toHaveBeenCalled();
    });
  });

  test('inspectLottoWinningStatus 메소드가 각 로또의 getRank 메소드를 호출하는지 테스트', () => {
    const winningNumbers = [1, 10, 20, 30, 40, 42];
    const bonusNumber = 7;

    lottoCenter.inspectLottoWinningStatus(winningNumbers, bonusNumber);

    publishedLottoList.forEach((lotto) => {
      expect(lotto.getRank).toHaveBeenCalledWith(winningNumbers, bonusNumber);
    });
  });

  test('getLottoResultsList 메소드가 올바른 결과를 반환하는지 테스트', () => {
    const winningNumbers = [1, 10, 20, 30, 40, 42];
    const bonusNumber = 7;

    lottoCenter.inspectLottoWinningStatus(winningNumbers, bonusNumber);

    const expectedResultsList = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 5,
    };
    // const expectedResultsList = {
    //   first: 0,
    //   second: 0,
    //   third: 0,
    //   fourth: 0,
    //   fifth: 5, // 5개의 로또가 모두 5등이라 가정
    // };

    expect(lottoCenter.getLottoResultsList()).toEqual(expectedResultsList);
  });
});
// describe('LottoCenter 클래스 테스트', () => {
//   let lottoCenter = null;
//   let publishedLottoList = null;

//   beforeEach(() => {
//     publishedLottoList = [
//       new Lotto([1, 2, 3, 4, 5, 6]),
//       new Lotto([7, 8, 9, 10, 11, 12]),
//       new Lotto([13, 14, 15, 16, 17, 18]),
//     ];
//     lottoCenter = new LottoCenter(publishedLottoList);
//   });

//   test('LottoCenter 생성자 작동 테스트', () => {
//     expect(lottoCenter).toBeInstanceOf(LottoCenter);
//   });

//   test('inspectLottoWinningStatus와 getLottoResultsList 작동 테스트', () => {
//     lottoCenter.inspectLottoWinningStatus([1, 2, 3, 4, 5, 6], 7);
//     expect(lottoCenter.getLottoResultsList()).toEqual({
//       first: 1,
//       second: 0,
//       third: 0,
//       fourth: 0,
//       fifth: 0,
//     });
//   });
// });
