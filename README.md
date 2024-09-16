# Wooteek - 복합 쇼핑몰

**Wooteek**은 다양한 상품을 구매할 수 있는 복합 온라인 쇼핑몰입니다. React와 최신 웹 기술을 활용하여 구축된 Wooteek은 상품 검색, 필터링, 장바구니 관리 등 사용자에게 편리한 쇼핑 경험을 제공합니다.

## Demo

[Live Demo](https://wootkeek.web.app/)
[GitHub](https://github.com/woojungyang/react-shopping-mall/tree/develop?tab=readme-ov-file)

---

## 목차

- [Wooteek - 복합 쇼핑몰](#wooteek---복합-쇼핑몰)
  - [Demo](#demo)
  - [목차](#목차)
  - [주요 기능](#주요-기능)
  - [기술 스택](#기술-스택)
  - [설치 방법](#설치-방법)
  - [디렉토리 구조](#디렉토리-구조)
  - [참고사항](#참고사항)

---

## 주요 기능

- **상품 검색 및 필터링**: 다양한 카테고리 내에서 상품을 검색하고 필터를 적용해 쉽게 찾아볼 수 있습니다.
- **장바구니 기능**: 상품을 장바구니에 추가하고 결제까지 편리하게 진행할 수 있습니다.
- **사용자 인증**: 회원가입, 로그인 및 프로필 관리 기능을 제공합니다.
- **결제 기능**: Toss Payments SDK를 이용한 결제 기능이 통합되어 있습니다.
- **Mock 데이터 사용**: 개발 및 테스트 목적으로 Mock 데이터를 사용하여 상품 정보와 거래를 시뮬레이션합니다.

---

## 기술 스택

- **React**: 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리.
- **Redux / Redux Toolkit**: 전역 상태 관리와 상태 업데이트를 간소화하는 라이브러리.
- **React Query**: 데이터 가져오기 및 동기화 상태 관리를 쉽게 해주는 라이브러리.
- **Sass**: CSS 전처리기로, 스타일링을 효율적으로 관리합니다.
- **Node.js**: 서버 측 로직을 처리하는 자바스크립트 런타임 환경.
- **Axios**: API 통신을 위한 HTTP 클라이언트.
- **Axios Mock Adapter**: 개발 환경에서 API 요청을 모킹하여 사용할 수 있는 라이브러리.
- **Luxon**: 시간대와 날짜 포맷을 처리하기 위한 라이브러리.
- **Daum Postcode API**: 주소 검색 기능을 제공합니다.
- **Kakao Maps SDK**: 웹 애플리케이션 내 지도 기능을 구현.
- **React Slick**: 반응형 슬라이더 컴포넌트.
- **Nanoid**: 구매 고유 ID 생성 라이브러리.

---

## 설치 방법

프로젝트를 로컬 환경에서 시작하려면 다음 단계를 따르세요:

1. 저장소를 클론합니다:

   ```bash
   git clone https://github.com/your-repo/wooteek.git
   ```

2. ```bash
    cd wooteek
    yarn install
   ```
3. ```bash
    yarn start
   ```

## 디렉토리 구조

```
- projectRoot/
  ├── public/
  ├── src/
  │ ├── app/ # 메인 애플리케이션 설정
  │ ├── assets/ # 이미지, 폰트 등의 정적 자산
  │ ├── components/ # 재사용 가능한 UI 컴포넌트
  │ ├── constants/ # 애플리케이션 상수 값
  │ ├── hooks/ # 사용자 정의 훅
  │ ├── mocks/ # Mock 데이터 및 API 요청
  │ ├── models/ # 데이터 모델 정의
  │ ├── pages/ # 주요 페이지
  │ ├── routes/ # 라우팅
  │ ├── styles/ # 사용자 정의 scss 파일
  │ ├── utilities/ # 유틸리티 함수 모음
  │ └── index.js # 메인 엔트리 포인트
  ├── .env # 환경 변수 파일
  ├── package.json # 패키지 의존성 관리 파일
  ├── yarn.lock # 패키지 버전 관리 파일
```

---

## 참고사항

현재 애플리케이션은 Mock 데이터를 사용하고 있으며, 이는 실제 데이터베이스와 연동되지 않습니다. 따라서 상품 정보 변경 및 구매 처리와 같은 기능은 실제로 반영되지 않습니다.
