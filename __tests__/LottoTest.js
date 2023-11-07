import Lotto from '../src/lotto/Lotto.js';
import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGE } from '../src/constant/constants.js';

jest.mock('@woowacourse/mission-utils');

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생하는지 테스트', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGE.wrongLottoNumberCount);
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생하는지 테스트', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGE.wrongLottoNumberInput);
  });
});

describe('로또 클래스 메소드 테스트', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('getRank가 제대로 등수를 판정하는지 테스트', () => {
    expect(lotto.getRank([1, 2, 3, 4, 5, 6], 7)).toBe('first');
    expect(lotto.getRank([1, 2, 3, 4, 5, 12], 6)).toBe('second');
    expect(lotto.getRank([1, 2, 3, 4, 5, 7], 10)).toBe('third');
    expect(lotto.getRank([1, 2, 3, 4, 7, 8], 6)).toBe('fourth');
    expect(lotto.getRank([1, 2, 3, 7, 8, 9], 6)).toBe('fifth');
    expect(lotto.getRank([1, 2, 10, 7, 8, 9], 6)).toBe(undefined);
  });
});
