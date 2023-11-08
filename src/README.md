# 로또 게임

## 기능 목록

- 로또 구입 금액 입력
  - 조건: 1000으로 나누어떨어지고, 1000 이상 9조 이하인 금액
  - 예외
    - 1000 이하의 금액
    - 9조를 초과하는 금액
    - 1000으로 나누어떨어지지 않는 금액
    - 숫자가 아닌 다른 입력이 포함된 경우
      
- 로또 발행: 주어진 금액 / 1000 한 만큼 로또를 발행
  - 조건: 1 ~ 45 범위의 겹치지 않는 6개의 수
  - 예외
    - 로또 숫자가 6개가 아닌 경우
    - 로또에 부여된 모든 숫자가 다르지 않은 경우
      
- 발행된 로또 출력
  - 형식: `[]`로 둘러싸이고 `, `로 구분되는 문자열
    예) `[1, 2, 3, 4, 5, 6]`
    
- 당첨 번호 입력
  - 형식: `,`로 구분한 6개의 숫자
    예) `1,2,3,4,5,6`
  - 예외
    - 입력한 수 중 겹치는 것이 있는 경우
    - 숫자의 범위가 1 ~ 45를 벗어나는 경우
    - `,`로 구분하지 않은 경우
    - `,`로 구분한 입력이 6개가 아닌 경우
    - 외에도 위의 형식을 지키지 않은 입력인 경우
      
- 보너스 번호 입력
  - 조건: 앞서 입력받은 당첨 번호와 겹치지 않는 1 ~ 45 사이의 수
    - 당첨 번호에 이미 포함된 수인 경우
    - 1 ~ 45 사이의 숫자 하나가 아닌 경우
    - 숫자가 아닌 다른 입력이 포함된 경우
      
- 발행된 로또들의 결과 확인
  - 규칙: 당첨 번호와 겹치는 숫자가 몇 개인지와 보너스 번호에 따라 등수 결정
    - 1등: 6개 숫자가 모두 일치
    - 2등: 5개 숫자가 일치하고 보너스 번호를 포함
    - 3등: 5개 숫자만 일치
    - 4등: 4개 숫자만 일치
    - 5등: 3개 숫자만 일치

- 당첨 결과 출력
  
- 수익률 출력
  - 조건: 소수점 둘째 자리에서 반올림

## 클래스 개요

- 현실을 모델로 클래스 설계
  - `Lotto`: `LottoStore`에서 로또를 발행해오고, 당첨 번호가 발표되면 결과를 계산한다.
  - `LottoStore`: 금액을 입력받고 금액만큼 로또를 발행해준다.
  - `LottoCenter`: 발행된 로또 리스트를 관리한다.
  - `LottoGame`: 로또 게임의 실행을 총괄하며, 결과 출력과 수익률 테스트를 담당한다.