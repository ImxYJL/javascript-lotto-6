import Lotto from '../src/lotto/Lotto.js';
import LottoStore from '../src/lotto/LottoStore.js';
import { ERROR_MESSAGE } from '../src/constant/constant.js';
import { getAndValidateInput } from '../src/utility/console.js';

// 에러상황 추가하기
jest.mock('../src/utility/console.js', () => ({
  getAndValidateInput: jest.fn(),
  print: jest.fn(),
}));

describe('LottoStore 클래스 테스트', () => {
  let lottoStore;

  beforeEach(async () => {
    const NORMAL_MONEY_INPUT = '5000';
    getAndValidateInput.mockResolvedValue(NORMAL_MONEY_INPUT);

    lottoStore = new LottoStore();
    await lottoStore.setLottoStore();
  });

  test('setLottoStore에서 정상적으로 money를 세팅하는지 테스트', () => {
    const NOMAL_MONEY = 5000;
    expect(lottoStore.getMoney()).toBe(NOMAL_MONEY);
  });

  test('setLottoStore에서 정상적으로 publishCount를 세팅하는지 테스트', () => {
    const LOTTO_NUMBER = 5;
    const lottos = lottoStore.publishLottos();
    expect(lottos.length).toBe(LOTTO_NUMBER);
  });

  test('publishLottos 함수가 Lotto 인스턴스를 반환하는지 테스트', () => {
    const lottos = lottoStore.publishLottos();
    lottos.forEach((lotto) => {
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});

describe('LottoStore 클래스 에러 발생 테스트', () => {
  test('setLottoStore에서 1000 미만의 입력에 예외를 발생시키는지 테스트', async () => {
    const UNDER_MIN_RANGE_MONEY = '900';
    // getAndValidateInput.mockRejectedValue(
    //   new Error(ERROR_MESSAGE.wrongMoneyRangeInput),
    // );
    const lottoStore = new LottoStore();
    await expect(lottoStore.setLottoStore()).rejects.toThrow(
      ERROR_MESSAGE.wrongMoneyRangeInput,
    );
  });

  test('setLottoStore에서 9조를 초과하는 입력에 예외를 발생시키는지 테스트', async () => {
    const UPPER_MIN_RANGE_MONEY = '90000000000001';
    //getAndValidateInput.mockResolvedValue(UPPER_MIN_RANGE_MONEY);
    const lottoStore = new LottoStore();

    await expect(getAndValidateInput(UPPER_MIN_RANGE_MONEY)).rejects.toThrow(
      ERROR_MESSAGE.wrongMoneyRangeInput,
    );
  });

  test('setLottoStore에서 숫자가 아닌 입력에 예외를 발생시키는지 테스트', () => {
    const MONEY_WITH_ALPHABET = '10000a';
    getAndValidateInput.mockResolvedValue(MONEY_WITH_ALPHABET);
    const lottoStore = new LottoStore();

    expect(lottoStore.getAndValidateInput()).toThrow(
      ERROR_MESSAGE.wrongMoneyRangeInput,
    );
  });
});
