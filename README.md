# 성진혁 | Product-minded Backend Developer

사용자의 흩어진 문제를 서비스 흐름으로 정리하고,
백엔드와 AI를 활용해 실제로 동작하는 결과물로 만드는 개발자입니다.

[Portfolio] [Resume] [GitHub] [Baekjoon]

---

## About Me

- 가톨릭대학교에서 팀 프로젝트와 해커톤을 통해 서비스를 기획하고 구현해왔습니다.
- 2024년 멋쟁이사자처럼 12기 활동을 통해 협업 기반 웹 서비스 개발을 경험했습니다.
- 2026년 하나 청년 금융인재 양성 프로젝트 본선에 합격해 ESG·미래금융 서비스 개발 프로젝트를 진행하고 있습니다.
- 문제 정의, 사용자 흐름 설계, 백엔드 구현, 성능 개선, 발표용 산출물 정리를 함께 다루는 것을 좋아합니다.

---

## Experience

| Period | Experience | What I did |
|---|---|---|
| 2026.04 ~ Present | 하나 청년 금융인재 양성 프로젝트 | 유학생 금융 온보딩을 주제로 Hana EZ 기반 프로토타입 제작 |
| 2024.03 ~ 2025.02 | 멋쟁이사자처럼 12기 @ 가톨릭대학교 | 7인 팀 프로젝트에서 Spring Boot API, 인증, S3, 성능 개선 경험 |
| 2024 | 가톨릭대학교 GGUM 해커톤 | 11인 팀 프로젝트에서 예약 정합성, N+1 개선, k6 성능 테스트 담당 |

---

## Featured Projects

### Hana EZ Student Start Mode
외국인 유학생의 입국 초기 금융 온보딩을 돕는 Hana EZ 기반 정적 HTML 프로토타입입니다.

- 하나 청년 금융인재 양성 프로젝트 4인 팀 산출물
- 학교, 비자, 국적, ARC 상태에 따라 가능한 금융 절차와 다음 단계를 분리
- 체크리스트, 스마트 캘린더, AI 금융 도우미 흐름을 발표용 데모로 구현

### songsim-campus-mcp
가톨릭대 성심교정 학생 정보를 공식 source 기반 Remote MCP와 HTTP API로 연결한 캠퍼스 도우미 서버입니다.

- 공지, 학사일정, 강의, 도서관 좌석, 식당, Wi-Fi 등 학생 생활 정보 통합
- 공식 source에 없는 값은 생성하지 않고 fallback 상태를 명시
- public QA corpus와 회귀 테스트로 답변 신뢰성 검증

### Memory of Year
멋쟁이사자처럼 12기에서 진행한 앨범·편지·사진·스티커 기반 추억 기록 서비스입니다.

- 7인 팀 프로젝트에서 Spring Boot REST API 개발
- JWT 인증, S3 업로드, Swagger 문서, k6 부하 테스트 구성
- 편지 목록 조회 N+1 문제 개선: DB 쿼리 31회 → 1회

### BorrowMe
대학생 간 물건 대여 흐름을 다루는 Spring Boot REST API 프로젝트입니다.

- 가톨릭대학교 GGUM 해커톤 11인 팀 프로젝트
- 예약 시스템, Pessimistic Lock 기반 동시성 제어, 알림 시스템 담당
- 상품 목록 조회와 동시 예약 정합성 개선 기록 보유

### Note2Quiz
강의자료를 AI 퀴즈, 오답노트, SM-2 복습으로 연결하는 학습 서비스입니다.

- PDF/텍스트 자료 업로드 후 Claude API 기반 퀴즈 생성
- 단답형·빈칸 문제 의미 기반 채점
- 학습 진도, 정답률, 취약 개념, 복습 일정 대시보드 제공

### AI Interview Coach
JD 분석 기반 질문 생성과 SSE 피드백을 제공하는 AI 면접 코치입니다.

- Spring Boot 기반 5개 서비스와 Next.js 프론트엔드 구성
- JD 분석, 질문 생성, 면접 세션, 피드백, 통계 흐름 분리
- RAG, Redis 캐싱, SSE 스트리밍, 성능 개선 기록 포함

---

## Engineering Strengths

- **Backend API**: Spring Boot, FastAPI, REST API, 인증/인가, 파일 업로드
- **Reliability**: 동시성 제어, Pessimistic Lock, Redis Lock, fallback 설계
- **Performance**: N+1 개선, k6 부하 테스트, 캐시, 인덱스, 쿼리 최적화
- **AI Service**: Claude API, RAG, MCP, SSE streaming, 프롬프트 파이프라인
- **Collaboration**: 해커톤, 동아리 팀 프로젝트, 발표용 프로토타입, 문서화

---

## More Case Studies

백엔드 성능과 동시성 실험은 포트폴리오에서 더 자세히 정리했습니다.

- Concert Booking: 좌석 예매 동시성, Redis 대기열, Kafka 복구 흐름
- Timedeal Service: 주문 burst, 캐시, rate limiting, circuit breaker
- Realtime Chat: Kafka, WebSocket, Redis Pub/Sub, 메시지 순서 보장

---

## Tech Stack

Java · Spring Boot · JPA · MySQL · PostgreSQL · Redis · Kafka · Docker · GitHub Actions · k6 · Prometheus · Grafana · FastAPI · Next.js · TypeScript · Claude API
