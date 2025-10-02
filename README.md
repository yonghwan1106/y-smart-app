# Y-SMART - 용인 스마트 모빌리티 앱

용인시 통합 모빌리티 플랫폼 Y-SMART의 React 컴포넌트 구현

## 🚀 프로젝트 구조

```
y-smart-app/
├── src/
│   ├── components/
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Input.tsx
│   │   └── route/           # 경로 관련 컴포넌트
│   │       └── RouteCard.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home.tsx         # 메인 홈 화면
│   │   ├── RouteSearch.tsx  # 경로 검색 결과
│   │   ├── Navigation.tsx   # 실시간 위치 추적
│   │   └── Payment.tsx      # 통합 결제
│   ├── types/
│   │   └── index.ts         # TypeScript 타입 정의
│   ├── App.tsx              # 메인 앱 라우팅
│   ├── main.tsx             # 앱 진입점
│   └── index.css            # 글로벌 스타일
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📱 구현된 화면

### 1. 홈 화면 (Home.tsx)
- 출발지/도착지 검색
- 즐겨찾기 바로가기 (집, 직장)
- 빠른 액세스 (실시간버스, 경전철, 타바용)
- AI 추천 카드

### 2. 경로 검색 결과 (RouteSearch.tsx)
- 멀티모달 경로 카드
- 필터 (빠른 순, 저렴한 순, 편한 순)
- 교통약자 경로 옵션
- 실시간 혼잡도 표시

### 3. 실시간 네비게이션 (Navigation.tsx)
- 실시간 위치 추적 지도
- 다음 단계 안내 카드
- 진행률 프로그레스 바
- 여정 타임라인

### 4. 통합 결제 (Payment.tsx)
- 여정 요금 요약
- 다양한 결제 수단
- 혜택/할인 표시
- 월간 교통비 통계

## 🛠 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **React Router** - 라우팅
- **Vite** - 빌드 도구
- **Lucide React** - 아이콘
- **Tailwind CSS** (인라인 스타일) - 스타일링

## 🚦 시작하기

### 설치

```bash
cd y-smart-app
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 🎨 디자인 시스템

### 색상 팔레트
- Primary: Teal (#14b8a6)
- Success: Green (#22c55e)
- Warning: Yellow (#eab308)
- Error: Red (#ef4444)
- Gray scale: 50-900

### 컴포넌트
- **Button**: 3가지 variants (primary, secondary, outline)
- **Card**: 그림자 효과, 클릭 가능
- **Input**: 아이콘 지원, 포커스 스타일
- **Header**: 뒤로가기, 알림, 설정

## 📝 주요 기능

### 재사용 가능한 컴포넌트
- 모든 UI 요소가 독립적인 컴포넌트로 분리
- Props를 통한 유연한 커스터마이징
- TypeScript로 타입 안정성 보장

### 라우팅
```
/ → 홈
/routes → 경로 검색 결과
/navigation → 실시간 네비게이션
/payment → 결제
```

### 반응형 디자인
- 모바일 우선 (max-width: 480px)
- Flexbox 레이아웃
- 터치 친화적 버튼 크기

## 🔧 다음 단계 개선사항

1. **상태 관리**: Context API 또는 Zustand 추가
2. **실시간 데이터**: React Query로 폴링 구현
3. **지도 연동**: Kakao Map API 통합
4. **애니메이션**: Framer Motion 추가
5. **PWA**: 오프라인 지원
6. **테스트**: Jest + Testing Library

## 📄 라이선스

MIT License - 용인시 정책제안용 프로토타입

## 👨‍💻 개발자

박용환 - 2025년 10월
