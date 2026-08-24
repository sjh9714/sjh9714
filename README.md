# 성진혁

### Product Engineer · Backend-focused

사용자 반응으로 무엇을 만들지 좁히고, 화면·API·외부 데이터가 만나는 경계를 구현합니다.

[Portfolio](https://sjh9714.vercel.app) · [Blog](https://sjh9714.tistory.com) · [Krea Gallery](https://sjh9714.github.io/krea2-wildcards/) · [OSS PRs](https://github.com/search?q=is%3Apr+author%3Asjh9714+is%3Amerged+-user%3Asjh9714&type=pullrequests)

**Stack** — TypeScript·React / Java·Spring / Python·FastAPI

- **PRODUCT** — Krea 2 · 500+ 프롬프트·생성 결과 쌍 검색·비교
- **TEAM** — FinMate · My ETA · 사용자 근거와 외부 API 연결
- **BACKEND** — Concert Booking · Realtime Chat · 동시성·전달 검증
- **REVIEW** — Black #5238 · 오류 재현과 리뷰 근거 확인

## 01 — TEAM PROJECTS

### FinMate — 20대의 첫 금융 온보딩
*2026.04–08 · 4인 · 화면 설계·웹앱·API · 하나금융그룹 × 금융감독원 결선 진출*

- **문제와 결정** — 팀의 문제 탐색 설문 97명과 정적 화면 의향 조사 108명을 바탕으로, 또래 패턴을 확인하고 작은 미션을 시작하는 흐름을 정했습니다.
- **내 역할과 시점** — 최종 제출 약 5일 전부터 화면 설계·웹앱·목 API 흐름을 맡았고, 8월 이후 실제 앱의 데이터 구조에 맞춘 Spring API와 PostgreSQL 기반 Testcontainers 통합 테스트 50개를 별도로 구현했습니다.
- **근거와 경계** — 설문과 데이터 EDA는 팀 결과입니다. 발표본은 모의 마이데이터와 시연용 응답을 사용했으며 실제 마이데이터·실시간 생성형 AI·금융상품 가입은 연결하지 않았습니다. · [App](https://github.com/gaga-studio/finmate-app) · [API](https://github.com/gaga-studio/finmate-api) · [발표자료](https://github.com/gaga-studio/finmate-app/blob/main/docs/FinMate-%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pptx) · [회고](https://sjh9714.tistory.com/2)

### My ETA — 교통약자를 위한 배리어프리 길찾기
*2026.07–08 · 7인 · 백엔드·외부 API·파트 간 요청·응답 계약*

- **문제와 결정** — 일반적인 예상 시간이 개인의 보행 속도와 이동 편의시설, 실제 탑승 조건을 충분히 반영하지 못한다는 가설에서 출발했습니다.
- **내 역할과 시점** — 해커톤에서는 지도·목적지 검색·경로 요청·화면 표시를 실제 API 흐름으로 연결했습니다. 이후 보행 속도·경로 거리·GPS 표본을 반영한 계산 엔진과 화면을 연결했습니다.
- **근거와 경계** — 해커톤 당시 개인화 ETA·저상버스 결과는 시연 데이터였습니다. 2026.08.22 기준 이후 구현은 백엔드 69개·프론트엔드 23개 테스트를 통과했지만, 경사·보행환경 실데이터와 실제 교통약자의 효과는 검증하지 못했습니다. · [Repository](https://github.com/tech4good-2026/eta) · [회고](https://sjh9714.tistory.com/1)

### Student Start Mode — 유학생 금융 온보딩
*2026.04–05 · 4인 · 기획·프로토타입 · 청년 금융인재 예선 통과*

- **문제와 결정** — 유학생의 비자·외국인등록증 상태에 따라 지금 가능한 금융 업무가 달라지는 문제를 가능·다음 단계·잠김 상태로 나눴습니다.
- **내 역할과 시점** — 역대 수상작과 평가 기준을 조사해 주제를 제안하고, 상태 기반 체크리스트 프로토타입을 공동 구현했으며 발표 영상의 흐름·타이밍·음향을 다듬었습니다.
- **근거와 경계** — 예선 통과에 사용한 제출용 프로토타입이며, 본선 과정에서 팀의 최종 주제는 FinMate로 전환했습니다. · [Repository](https://github.com/sjh9714/Student_Start_Mode_demo)

### Memory of Year — 추억 앨범 서비스
*2024.10–12 · 7인 · Backend · 멋쟁이사자처럼 데모데이*

- **문제와 결정** — 앨범 안에 사진과 편지를 함께 남기는 흐름을 인증·앨범·편지·사진 네 도메인으로 나눴습니다.
- **내 역할과 시점** — 인증·앨범·편지·사진 API의 기반과 AWS EC2·DB·S3·HTTPS 환경을 구성하고, 프론트엔드와 연동해 배포 API를 사용한 팀 시연까지 연결했습니다.
- **근거와 경계** — 2026년에 코드를 다시 열어 앨범 소유권 판정과 MySQL·S3 사이의 저장 경계를 재검토했습니다. · [Repository](https://github.com/sjh9714/memory_of_year)

### BorrowMe — 교내 물품 대여 서비스
*2024.10 팀 해커톤 · 11인 · Backend → 2026 개인 재설계*

- **문제와 결정** — 2026년에 기존의 요청 즉시 재고만 줄이는 흐름을 승인·인도·반납 확인까지 이어지는 대여 생명주기로 다시 설계했습니다.
- **내 역할과 시점** — 2024년 팀에서는 댓글·답글 알림 API를 구현했고, 2026년 개인 작업으로 상태 전이·권한·멱등성·재고 동시성 보호와 스키마 이관을 추가했습니다.
- **근거와 경계** — 해커톤 당시 팀 기여와 이후 개인 재설계를 구분하며, 2024년 예약 기능 전체를 제 작업으로 주장하지 않습니다. · [Repository](https://github.com/sjh9714/borrow_me)

## 02 — BACKEND SYSTEMS

### Concert Booking — 대기열·락·이벤트 전달
*2026.02–05 · 설계·구현·측정 전체 · Java·Spring Boot·PostgreSQL·Redis·React*

- **검증 질문** — 같은 좌석의 중복 판매를 막으면서 다른 좌석의 요청까지 불필요하게 막지 않으려면 어디에 동시성 경계를 둬야 하는가.
- **구현** — 락 3종, Redis 매진 선필터, SSE 대기열, 멱등 요청과 Outbox 재시도·격리, DLT 수동 재처리 경계를 비교·구현했습니다.
- **로컬 비교 결과** — 동일 좌석 100명 경합에서 세 락 전략 모두 중복 판매 0건이었습니다. 서로 다른 좌석 50건의 성공률은 비관적·낙관적·Redis 락이 각각 100%·40%·100%, 혼합 부하 쓰기 p95는 37·10·6ms였습니다. 운영 성능을 뜻하지 않습니다. · [Repository](https://github.com/sjh9714/concert-booking)

### Realtime Chat — 다중 인스턴스·영속화·재연결
*2026.02–05 · 설계·구현·측정 전체 · Java·Spring Boot·STOMP·Redis·React*

- **검증 질문** — 두 서버에서 DB 저장·브로드캐스트·재연결 보충의 순서를 어떻게 고정해야 누락과 중복을 피할 수 있는가.
- **구현** — 커밋 후 브로드캐스트, Redis 전달, 커서 기반 보충, 멱등성, JPQL 프로젝션과 인덱스를 적용했습니다.
- **검증 결과** — 현재 커밋을 고정한 50명·2개 인스턴스 receiver matrix를 3회 실행해 매회 기대한 4,900건이 모두 도착했고 누락·중복은 0건이었습니다. 로컬 시나리오 결과이며 운영 성능을 뜻하지 않습니다. · [Repository](https://github.com/sjh9714/realtime-chat)

## 03 — PUBLIC WORK

- **Krea 2 Wildcards** — 새 이미지 모델의 결과를 다시 찾고 비교하기 어려운 문제를 500+ 프롬프트·생성 결과 쌍과 63개 범주의 검색·저장·비교·복사 갤러리로 만들었습니다. · [Gallery](https://sjh9714.github.io/krea2-wildcards/) · [GitHub](https://github.com/sjh9714/krea2-wildcards)
- **Black #5238** — 오류 입력과 회귀 테스트를 만든 뒤 영향 범위를 좁힌 수정을 제안했습니다. 메인테이너 질문에 기존 규칙과 수정 위치의 근거를 다시 확인해 답했고 머지됐습니다. · [Pull Request](https://github.com/psf/black/pull/5238)
- **Tools** — [dsh-win32](https://github.com/sjh9714/dsh-win32) · [dsh-movein](https://github.com/sjh9714/dsh-movein) · [MergeWarden](https://github.com/sjh9714/mergewarden) · [VLUU](https://vluu.vercel.app)

## 04 — EXPERIENCE

- **가톨릭대학교 컴퓨터공학** — 2021.03–
- **하나금융그룹 × 금융감독원 청년 금융인재 양성 프로젝트** — 2026.04–08
- **Tech4Good 해커톤 · 하나금융그룹 × SK텔레콤 SKT FLY AI** — 2026.07
- **멋쟁이사자처럼 대학 12기 · Backend** — 2024.03–12
- **GGUM 해커톤 · Backend** — 2024.10

## 05 — WRITING

<!-- BLOG-POST-LIST:START -->
- [내 클로드 코드 세팅](https://sjh9714.tistory.com/15) <sub>2026.08.17</sub>
- [코딩 장벽은 사라졌는데, 다른 벽이 보이기 시작했다 - 바이브 코딩 6개월](https://sjh9714.tistory.com/14) <sub>2026.08.11</sub>
- [AI 슬롭 - 품질이 아니라 신뢰가 문제다](https://sjh9714.tistory.com/13) <sub>2026.08.10</sub>
- [컴퓨터구조 다시 공부해보기](https://sjh9714.tistory.com/12) <sub>2026.08.10</sub>
- [요즘 자꾸 보이는 하네스, 루프, 그래프가 뭔지 공부해봤다](https://sjh9714.tistory.com/11) <sub>2026.08.08</sub>
<!-- BLOG-POST-LIST:END -->

<details>
<summary>Stats</summary>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./stats/rank-dark.svg">
  <img src="./stats/rank-light.svg" height="195" alt="GitHub 통계">
</picture>
<a href="https://solved.ac/jinhyuk9714"><img src="https://mazassumnida.wtf/api/v2/generate_badge?boj=jinhyuk9714" height="195" alt="solved.ac 통계"></a>

</details>
