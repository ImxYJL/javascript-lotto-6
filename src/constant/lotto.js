export const LOTTO = Object.freeze({
  formatResult(matched, bonus, prizeString, count) {
    return `${matched}개 일치${bonus} (${prizeString}원) - ${count}개`;
  },
  price: 1000,
  count: 6,
  rank: {
    first: {
      rankNumber: 1,
      matched: 6,
      bonus: '',
      prize: 2000000000,
      prizeString: '2,000,000,000',
    },
    second: {
      rankNumber: 2,
      matched: 5, 
      bonus: ', 보너스 볼 일치',
      prize: 30000000,
      prizeString: '30,000,000',
    },
    third: {
      rankNumber: 3,
      matched: 5, 
      bonus: '',
      prize: 1500000,
      prizeString: '1,500,000',
    },
    fourth: {
      rankNumber: 4,
      matched: 4, 
      bonus: '',
      prize: 50000,
      prizeString: '50,000',
    },
    fifth: {
      rankNumber: 5,
      matched: 3, 
      bonus: '',
      prize: 5000,
      prizeString: '5,000',
    },
  },
});
