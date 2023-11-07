import LottoGame from '../src/lotto/LottoGame.js';
import LottoStore from '../src/lotto/LottoStore.js';
import LottoGameHost from '../src/lotto/LottoGameHost.js';
import LottoCenter from '../src/lotto/LottoCenter.js';

jest.mock('../src/lotto/LottoStore.js');
jest.mock('../src/lotto/LottoGameHost.js');
jest.mock('../src/lotto/LottoCenter.js');
jest.mock('../src/utility/console.js');

describe('LottoGame 클래스 테스트', () => {
  let lottoGame;

  beforeEach(() => {
    const mockLottoStore = new LottoStore();
    mockLottoStore.setLottoStore = jest.fn();
    mockLottoStore.publishLottos = jest.fn();

    const mockLottoCenter = new LottoCenter();
    mockLottoCenter.tryPrintAllLottoNumbers = jest.fn();

    LottoStore.mockImplementation(() => mockLottoStore);
    LottoCenter.mockImplementation(() => mockLottoCenter);

    lottoGame = new LottoGame(); // 여기로 이동
  });

  test('buyAndIssueLottos 메소드가 정상적으로 동작하는지 테스트', async () => {
    await lottoGame.buyAndIssueLottos();

    expect(lottoGame.lottoStore.setLottoStore).toHaveBeenCalled();
    expect(lottoGame.lottoCenter.tryPrintAllLottoNumbers).toHaveBeenCalled();
  });

  test('calculateReturnRate 메소드가 정상적으로 동작하는지 테스트', () => {
    const money = 1000;
    const lottoResultsList = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };

    const returnRate = lottoGame.calculateReturnRate(money, lottoResultsList);

    expect(returnRate).toBe('0.00');
  });

  test('calculateAndPrintResults 메소드가 정상적으로 동작하는지 테스트', () => {
    const mockLottoGameHost = new LottoGameHost();
    mockLottoGameHost.getWinningNumbers = jest
      .fn()
      .mockReturnValue([1, 2, 3, 4, 5, 6]);
    mockLottoGameHost.getBonusNumber = jest.fn().mockReturnValue(7);

    const mockLottoCenter = new LottoCenter();
    mockLottoCenter.inspectLottoWinningStatus = jest.fn();
    mockLottoCenter.getLottoResultsList = jest.fn().mockReturnValue({
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 5,
    });

    LottoGameHost.mockImplementation(() => mockLottoGameHost);
    LottoCenter.mockImplementation(() => mockLottoCenter);

    lottoGame.lottoCenter = mockLottoCenter; // lottoCenter 설정

    lottoGame.calculateAndPrintResults();

    expect(lottoGame.lottoCenter.inspectLottoWinningStatus).toHaveBeenCalled();
  });

  test('calculateAndPrintReturnRate 메소드가 정상적으로 동작하는지 테스트', () => {
    const mockLottoCenter = new LottoCenter();
    mockLottoCenter.getLottoResultsList = jest.fn().mockReturnValue({
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 5,
    });

    LottoCenter.mockImplementation(() => mockLottoCenter);

    const printModule = require('../src/utility/console.js');
    const printSpy = jest.spyOn(printModule, 'print'); // print 함수 모킹

    lottoGame.calculateAndPrintReturnRate(
      mockLottoCenter.getLottoResultsList(),
    );

    expect(printSpy).toHaveBeenCalled(); // 수익률 출력이 일어났는지 확인
  });
});
