import { Console } from '@woowacourse/mission-utils';
import { STORE_MESSAGE } from '../constant/ui.js';

const OutputView = {
  printCountGuide(count) {
    Console.print(STORE_MESSAGE.formatCount(count));
  },

  printText(text) {
    Console.print(text);
  },
};

export default OutputView;
