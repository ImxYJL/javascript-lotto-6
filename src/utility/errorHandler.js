import { print } from './console.js';

// export const handleError = {
//   handleError(callerFunc, callback) {
//     return (input) => {
//       try {
//         callback(input);
//       } catch (error) {
//         print(error.message);
//         callerFunc(callback, input);
//       }
//     };
//   },
// };

// export function handleError(callerFunc, callback) {
//     return (input) => {
//       try {
//         callback(input);
//       } catch (error) {
//         print(error.message);
//         callerFunc(callback, input);
//       }
//     };
// };

export const handleError = (callerFn, callback) =>{
    return (input) => {
      try {
        callback(input);
      } catch (error) {
        Console.print(error.message);
        callerFn(callback, input);
      }
    };
};
