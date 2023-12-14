export const MAX_MONEY_LIMIT = 1000000000000;

export const ONE_TO_NINE_REGEX = /^[1-9]$/;
export const DECIMAL_DIGIT_REGEX = /^[0-9]$/;

export const STORE_MESSAGE = Object.freeze({
  getMoney: '구입금액을 입력해 주세요.\n',
  getLottoNumbers: '\n당첨 번호를 입력해 주세요.\n',
  getBounsNumber: '\n보너스 번호를 입력해 주세요.\n',
  formatCount(count) {
    return `\n${count}개를 구매했습니다.`;
  },
});

export const RESULT_MESSAGE = Object.freeze({
  resultTitle: '\n당첨 통계\n---',
  formatBenefitRate(benefitRate) {
    return `총 수익률은 ${benefitRate}%입니다.`;
  },
});

export const ERROR_MESSAGE = Object.freeze({
  wrongMoney:
    '[ERROR] 금액은 1000원 이상, 1조 미만이어야 하고, 1000으로 나누어떨어져야 합니다.',
  wrongLottoNumbers:
    '[ERROR] 당첨 번호는 1 ~ 45 사이의 중복되지 않는 6개의 수입니다.',
  wrongBonusNumber:
    '[ERROR] 보너스 번호는 1 ~ 45 사이이며 당첨 번호와 중복되지 않는 수입니다.',
});
