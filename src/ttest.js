// import { Random } from '@woowacourse/mission-utils';
import { Console } from '@woowacourse/mission-utils';
import { Validator } from './utility/validation.js';
// import {isValidateNumber, isNumberWithinBounds,isEmptyString,isLengthWithinBounds } from './utility/validation.js';
import { LOTTO_RANK, LIMIT_CONSTANT, MESSAGE } from './constant/constants.js';

// getUserInput();

// const isValidMoney = (money) => {
//     const validationFunctions = [isEmptyString, isValidateNumber, isNumberWithinBounds, isLengthWithinBounds];

//     for (let i = 0; i < validationFunctions.length; i++) {
//       const validationFunction = validationFunctions[i];
//       const callback = handleError(getUserInput, validationFunction);

//       callback(money);
//     }
//     console.log(money);
//   }

// const mon = await Console.readLineAsync('input: ');
// isValidMoney(mon);

// function errorHandler(callback) {
//   return (input) => {
//     try {
//       callback(input);
//     } catch (error) {
//       OutputView.printErrorMessage(error.message);
//       callerFn(callback);
//     }
//   };
// }
// }

// const handleError = (callerFn, callback) => async() => {
//   try {
//     const userInput = await callerFn();
//     callback(userInput);
//   } catch (error) {
//     Console.print(error.message);
//     await handleError(callerFn, callback)();
//   }
// };

// const errorHandler = {
//   handleError(callerFn, callback) {
//     return (input) => {
//       try {
//         callback(input);
//       } catch (error) {
//         Console.print(error.message);
//         callerFn(callback);
//       }
//     };
//   },
// };

const getInput = (question, callback, redirect) => {
  Console.readLine(question, (input) => {
    try {
      callback(input);
    } catch (error) {
      Console.print(error.message);
      redirect(callback);
    }
  });
};

// class MoneyManager {

//   // 생성자에 반복문각

//   isValidMoney(money){
//     const isEmptyInput = handleError(this.isValidMoney.bind(this), isEmptyString, 3);
//     isEmptyInput(money);

//     // 1자리 ~ 16자리: 9조 이하의 숫자만 입력 가능
//     const isExceedMaxLength = handleError(this.isValidMoney.bind(this), isLengthWithinBounds, 3);
//     isExceedMaxLength(money, LIMIT_CONSTANT.minLimit, LIMIT_CONSTANT.lengthMaxLimit);

//     //이름 겹쳐도 되나
//     const isValidateN = handleError(this.isValidMoney.bind(this), isValidateNumber);
//     isValidateN(money,3);

//     const isOneToNineQuadrillion = handleError(this.isValidMoney.bind(this), isNumberWithinBounds);
//     isOneToNineQuadrillion(parseInt(money), LIMIT_CONSTANT.minLimit, LIMIT_CONSTANT.numberMaxLimit,3);
//   };
// };

// const t = new MoneyManager();
// t.isValidMoney(''); // 안됨
// const a = await Console.readLineAsync('input: ');
// t.isValidMoney('0'); // 넌 통과하면 어떡ㄱ해
// t.isValidMoney('90000000000005'); // 않이 외 되는데

// const getAndValidateInput = handleError(readLineAsync, isEmptyString);
// getAndValidateInput();

// 사용 예

// 위아래 둘다 됨

// const getAndValidateInput = async () => {
//   let userInput;
//   while (true) {
//     try {
//       userInput = await readLineAsync("Please enter a value: ");
//       isEmptyString(userInput);
//       isValidateNumber(userInput);
//       isLengthWithinBounds(userInput, LIMIT_CONSTANT.minLimit, LIMIT_CONSTANT.lengthMaxLimit);
//       isNumberWithinBounds(parseInt(userInput), LIMIT_CONSTANT.minLimit, LIMIT_CONSTANT.numberMaxLimit);
//       break; // 유효한 입력을 받았으므로 while 루프를 빠져나옵니다.
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
//   return input;
// };

// getAndValidateInput();

const validateInput = (input, validationList) => {
  validationList.forEach((validation) => validation(input));
};

const getAndValidateInput = async (message, validationList) => {
  let userInput;
  while (true) {
    try {
      userInput = await Console.readLineAsync(message);
      validateInput(userInput, validationList);
      break;
    } catch (error) {
      Console.print(error.message);
    }
  }
  return userInput;
};

class MoneyManager {
  validations = [
    Validator.isValidateNumber,
    (input) =>
      Validator.isLengthWithinBounds(
        input,
        LIMIT_CONSTANT.minLimit,
        LIMIT_CONSTANT.lengthMaxLimit,
      ),
    (input) =>
      Validator.isNumberWithinBounds(
        parseInt(input),
        LIMIT_CONSTANT.minLimit,
        LIMIT_CONSTANT.numberMaxLimit,
      ),
  ];

  #a = '3';

  getA() {
    return this.#a;
  }

  async isValidMoney() {
    // const isEmpty = handleError(this.isValidMoney.bind(this), isEmptyString); // bind각?
    const t = await Number(
      getAndValidateInput(MESSAGE.moneyInput, this.validations),
    );
    console.log(`밖: ${t}`);
  }
}

// const t = new MoneyManager();
// console.log(t.getA());
// t.isValidMoney();

// class name {
//   name = '';

//   constructor(name) {
//     this.name = name;
//   }

//   setName(name) {
//     this.name = name;
//   }
// }

// const nameList = [];

// for (let i = 0; i < 4; i++) {
//   const t = new name(i);
//   nameList.push(t);
// }

// const mewList = nameList.slice();
// console.log(mewList);

// mewList[0].setName('asdf');

// const l = [1, 2, 3, 45];
// console.log(l);

const lottoResultsList = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
};

function printResults(lottoResultsList) {
  const ranks = ['fifth', 'fourth', 'third', 'second', 'first'];
  ranks.forEach((rank) => {
    const matchedNumber = LOTTO_RANK[rank].matchedNumber;
    //const extraText = LOTTO_RANK[rank].EXTRA_TEXT;
    const reward = LOTTO_RANK[rank].reward;
    const count = lottoResultsList[rank];
    Console.print(`${matchedNumber}개 일치 (${reward}) - ${count}개`);
    // Console.print(
    //   `${matchedNumber}개 일치${extraText} (${reward}) - ${count}개`,
    // );
  });
}

printResults(lottoResultsList);
