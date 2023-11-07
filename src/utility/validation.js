import {
  LOTTO_REGEX,
  DECIMAL_DIGIT_REGEX,
  ERROR_MESSAGE,
} from '../constant/constants.js';

// export const isDecimalChar = (character) => DECIMAL_DIGIT_REGEX.test(character);

// export const isValidateNumber = (string) => {
//   Array.from(string).forEach((digit) => {
//     if (!isDecimalChar(digit)) { throw new Error(ERROR_MESSAGE.wrongNumberInput); }
//   });
// };

// export const isNumberWithinBounds = (number, startNumber, endNumber) => {
//   if (number < startNumber || number > endNumber) {
//     throw new Error(ERROR_MESSAGE.wrongMoneyInput);
//   }
// };

// export const isLengthWithinBounds = (string, startNumber, endNumber) => {
//   if (string.length < startNumber || string.length > endNumber) {
//     throw new Error(ERROR_MESSAGE.wrongMoneyInput);
//   }
// };

// export const isEmptyString = (string) => {
//   if (string.trim() === '') {
//     throw new Error(ERROR_MESSAGE.wrongNumberInput);
//   }
// };

export const Validator = {
  isDecimalChar: (character) => DECIMAL_DIGIT_REGEX.test(character),

  isValidateNumber: (string) => {
    Array.from(string).forEach((digit) => {
      if (!Validator.isDecimalChar(digit)) {
        throw new Error(ERROR_MESSAGE.wrongNumberInput);
      }
    });
  },

  isNumberWithinBounds: (number, startNumber, endNumber) => {
    if (number < startNumber || number > endNumber) {
      throw new Error(ERROR_MESSAGE.wrongMoneyRangeInput);
    }
  },

  isLengthWithinBounds: (string, startNumber, endNumber) => {
    if (string.length < startNumber || string.length > endNumber) {
      throw new Error(ERROR_MESSAGE.wrongMoneyRangeInput);
    }
  },

  isMatchingRegex: (string, regex) => {
    if (!regex.test(string)) {
      throw new Error(ERROR_MESSAGE.wrongLottoNumberInput);
    }
  },
  // isEmptyString: (string) => {
  //   if (string.trim() === '') {
  //     throw new Error(ERROR_MESSAGE.wrongNumberInput);
  //   }
  // },

  validateInput: (input, validationList) => {
    validationList.forEach((validation) => validation(input));
  },
};
