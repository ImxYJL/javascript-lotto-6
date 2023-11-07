import { Console } from '@woowacourse/mission-utils';
import { Validator } from './validation.js';

export const print = (message) => Console.print(message);

export const readLineAsync = async (message) => Console.readLineAsync(message);

export const getAndValidateInput = async (message, validationList) => {
  let userInput;
  while (true) {
    try {
      userInput = await readLineAsync(message);
      Validator.validateInput(userInput, validationList);
      break;
      // return userInput; // 유효한 입력을 받았으므로 while 루프를 빠져나옵니다.
    } catch (error) {
      Console.print(error.message);
    }
  }

  return userInput;
};
