import LottoStore from './LottoStore.js'; // 경로는 실제 경로에 맞게 수정해야 합니다.
import { LOTTO_CONSTANT } from '../constant/constants.js';

describe('LottoStore class', () => {
  let lottoStore = null;

  beforeEach(() => {
    lottoStore = new LottoStore();
  });

  test('should create a new LottoStore instance correctly', () => {
    expect(lottoStore).toBeInstanceOf(LottoStore);
  });

  // 'setLottoStore'는 비동기 메소드이고 사용자 입력을 기다리므로 테스트하기 어렵습니다.
  // 따라서 이 메소드는 통합 테스트의 일환으로 별도의 테스트 케이스에서 처리하는 것이 좋습니다.

  test('publishLottos should return an array of Lotto instances', () => {
    // setLottoStore 메소드를 호출하여 상태를 설정하지 않았기 때문에,
    // publishLottos 메소드의 결과가 비어있는 배열이어야 합니다.
    expect(lottoStore.publishLottos()).toEqual([]);
  });
});
