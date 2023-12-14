import { DECIMAL_DIGIT_REGEX } from '../constant/ui.js';

// 유틸으로?
// const isDecimalChar = (character) => DECIMAL_DIGIT_REGEX.test(character);

export const isNumber = (input) =>
  [...input].every((digit) => DECIMAL_DIGIT_REGEX.test(digit));

export const isValidLottoNumbersFormat = (string) => /^(\d+,)*\d+$/.test(string);
