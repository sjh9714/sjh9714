<h1 align="center">성진혁</h1>
<h3 align="center">Backend Developer</h3>

<p align="center"><em>문제를 나누고 측정해 개선합니다.</em></p>

<p align="center">
  <a href="https://sjh9714.vercel.app"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white"/></a>
  <a href="https://sjh9714.tistory.com"><img src="https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=tistory&logoColor=white"/></a>
  <a href="https://github.com/pulls?q=is%3Apr+author%3Asjh9714+is%3Amerged+-user%3Asjh9714+-org%3Agaga-studio+-org%3Atech4good-2026+-org%3Akio-vibe+-org%3Alikelion-cuk-backend-12th+-org%3ATeam-Back-likelion+-org%3AMeotSamPing"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Fsearch%2Fissues%3Fq%3Dis%3Apr%2Bauthor%3Asjh9714%2Bis%3Amerged%2B-user%3Asjh9714%2B-org%3Agaga-studio%2B-org%3Atech4good-2026%2B-org%3Akio-vibe%2B-org%3Alikelion-cuk-backend-12th%2B-org%3ATeam-Back-likelion%2B-org%3AMeotSamPing&query=%24.total_count&label=OSS%20merged%20PRs&style=for-the-badge&color=6e40c9&logo=github&logoColor=white"/></a>
  <a href="https://vluu.vercel.app"><img src="https://img.shields.io/badge/Gallery-111111?style=for-the-badge&logo=googlephotos&logoColor=white"/></a>
</p>

<br/>

## 📊 Stats

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./stats/rank-dark.svg">
  <img src="./stats/rank-light.svg" height="195" alt="GitHub 통계 - 별, 커밋, PR, 이슈와 등급">
</picture>
<a href="https://solved.ac/jinhyuk9714">
  <img src="https://mazassumnida.wtf/api/v2/generate_badge?boj=jinhyuk9714" height="195" alt="백준 solved.ac 티어와 푼 문제 수">
</a>

<br/>

## 🌱 Experience

- **가톨릭대학교 컴퓨터공학** | 재학 (2021.03 ~ )
- **하나금융그룹 x 금융감독원 청년 금융인재 양성 프로젝트** | 금융데이터 분석 · 생성형 AI · LLM (2026.04 ~ 2026.08)
- **Tech4Good 해커톤** | 하나금융그룹 x SK텔레콤 `SKT FLY AI` 연합 (2026.07)
- **멋쟁이사자처럼 대학 12기** | Backend · 중앙해커톤(2024.08) · 데모데이(2024.12) (2024.03 ~ 2024.12)
- **GGUM 해커톤** | 가톨릭대 컴퓨터정보공학부 연합 해커톤 · Backend (2024.10)

<br/>

## 📂 Team Projects

### 1. FinMate | 20대의 첫 금융 온보딩 서비스
> **Role:** Backend · **기간:** 2026.04 ~ 2026.08 · **팀:** 4인
> **결과:** 하나금융그룹 x 금융감독원 청년 금융인재 **결선 진출작**

- **API 서버 구현**: Java · Spring · PostgreSQL 로 인증 · 미션 · 또래 비교 · 리포트까지 서비스 API 전 범위를 설계하고 구현
- **통합 테스트 환경**: Testcontainers 로 실제 PostgreSQL 을 띄워 검증하는 통합 테스트 50개를 붙여, 로컬과 CI 가 같은 DB 에서 돌게 함
- **저장소 분리**: 웹앱 · API · 데이터 파이프라인을 세 저장소로 나누고 API 계약 문서를 API 저장소에 모아 배포 주기를 분리
- **주제 전환 대응**: 예선에서 쓰던 유학생 온보딩을 20대 금융 온보딩으로 옮기며 도메인 모델을 다시 세움

🔗 https://github.com/gaga-studio/finmate-app

<br/>

### 2. My ETA | 교통약자를 위한 배리어프리 길찾기
> **Role:** Backend · **기간:** 2026.07 ~ 2026.08 · **팀:** 7인 (하나금융그룹 x SK텔레콤 Tech4Good)

- **개인화 ETA 보정**: 표준 보행속도 대신 사용자의 평소 속도와 안내 중 수집한 유효 속도 표본으로 도보 구간 도착시간을 다시 계산
- **공공데이터 연동**: 서울 버스·지하철 실시간 도착정보, 저상버스 여부, 엘리베이터 접근성 정보를 경로에 반영
- **미확인 정보 표기**: 확인되지 않은 시설 정보를 이용 가능으로 단정하지 않고 `UNKNOWN` 상태로 노출
- **재탐색**: 경로 이탈과 대중교통 놓침을 감지해 현재 위치 기준으로 경로와 ETA 를 다시 계산
- **지역 확장 여지**: 품질 보장 범위를 서울로 한정하고, 다른 지역 데이터 공급자를 어댑터로 갈아 끼울 수 있게 구성

🔗 https://github.com/tech4good-2026/eta

<br/>

### 3. Student Start Mode | 유학생 금융 온보딩
> **Role:** 기획 · 프로토타입 · **기간:** 2026.04 ~ 2026.05 · **팀:** 4인
> 🏆 **청년 금융인재 예선 통과 · 본선 합격작**

- **상태 기반 체크리스트**: 정보를 모아 보여주는 대신 지금 가능 / 다음 단계 / 잠김 으로 나눠, 현재 상태에서 할 수 있는 것만 앞에 둠
- **상태 변화 반영**: ARC 수령 같은 변화가 생기면 잠긴 항목을 풀고 다음 작업을 안내
- **역할 분리**: 판단은 상태와 규칙이 하고, AI 채팅은 세부 질문을 돕는 보조로 한정
- **일정 안내**: 비자 만료일 · ARC 수령일 · 계좌 개설 권장일을 캘린더로 묶어 다음에 할 일이 날짜로 보이게 함
- **출처 노출**: 하나은행과 금융 규정에 근거한 안내임을 화면 안에서 함께 표시

🔗 https://github.com/sjh9714/Student_Start_Mode_demo

<br/>

### 4. Memory of Year | 추억 앨범 서비스
> **Role:** Backend · **기간:** 2024.10 ~ 2024.12 · **팀:** 7인 (디자인 1 · 프론트 2 · 백엔드 4) · 멋쟁이사자처럼 데모데이

- **도메인 API 구현**: 인증 · 앨범 · 편지 · 사진 네 갈래의 백엔드 기반을 맡아 설계하고 구현
- **인프라 직접 구성**: AWS EC2 · DB · S3 · HTTPS 를 직접 세워 팀이 시연할 수 있는 서버를 운영
- **프론트 연동**: 배포된 API 로 프론트엔드 화면을 붙이고 데모데이 시연까지 진행
- **사후 재검증**: 2026년에 다시 열어 앨범 소유권 판정과 MySQL · S3 사이의 경계를 재검토

🔗 https://github.com/sjh9714/memory_of_year

<br/>

### 5. BorrowMe | 교내 물품 대여 서비스
> **Role:** Backend · **기간:** 2024.10 (GGUM 해커톤, 11인) → 2026 개인 재작업

- **알림 기능 (2024)**: 댓글·답글 알림 생성과 조회 · 읽음 처리 · 삭제를 구현하고 `NotificationController` 를 REST API 로 전환
- **대여 생명주기 완성 (2026)**: 요청 즉시 재고를 깎고 취소하면 되돌리는 수준이던 것을, 승인 → 인도 → 반납 확인까지 상태로 다루도록 재설계
- **동시성 보호**: 같은 물건에 요청이 몰릴 때 재고가 음수로 내려가지 않도록 막고, 이를 고정하는 동시성 테스트 작성
- **권한과 재시도**: 승인·인도·반납 각 단계의 권한을 분리하고, 같은 요청이 두 번 들어와도 상태가 한 번만 넘어가도록 처리
- **스키마 이관**: 기존 데이터를 새 상태 모델로 옮기는 마이그레이션을 작성하고 CI 에 연결

🔗 https://github.com/sjh9714/borrow_me

<br/>

## 💻 Backend Portfolio

> 동시성 · 정합성 · 실시간 전달 · 분산 트랜잭션을 주제로 직접 만들고 측정한 개인 프로젝트입니다.
> 정리된 화면은 [sjh9714.vercel.app](https://sjh9714.vercel.app) 에 있습니다.

### 1. 좌석 예약 시스템 | 대기열 · 락 전략 · 이벤트 전달
> **Role:** 설계 · 구현 · 측정 전체 · **기간:** 2026.02 ~ 2026.05 · **Stack:** Java · Spring Boot · PostgreSQL · Redis · React

- **중복 판매 차단**: 같은 좌석에 100명이 몰릴 때 나던 oversell 을 락 3종을 비교해 0건으로, p95 는 106–215ms 로 실측
- **경합 원인 규명**: 다른 좌석인데 예매가 서로 실패하던 원인이 잔여석 카운터 한 줄임을 밝혀 성공률 40% → 100%
- **매진 좌석 선필터**: 매진된 좌석 요청까지 DB 를 잡던 것을 Redis 에서 미리 걸러 쓰기 p95 37ms → 6ms, 총 RPS 969 → 1,005
- **대기열과 멱등성**: 순번을 SSE 로 내려보내고, 토큰 응답이 유실돼 재요청해도 예매는 한 건만 생기도록 처리
- **이벤트 전달**: Outbox 로 예매 확정 이벤트를 흘려보내 후속 처리와 예매 트랜잭션을 분리

🔗 https://github.com/sjh9714/concert-booking

<br/>

### 2. 실시간 채팅 서버 | 다중 인스턴스 · 영속화 · 전달 검증
> **Role:** 설계 · 구현 · 측정 전체 · **기간:** 2026.02 ~ 2026.05 · **Stack:** Java · Spring Boot · STOMP · Redis · React

- **전달 보장**: DB 커밋이 끝난 뒤에만 브로드캐스트하도록 순서를 강제. 50명이 두 인스턴스에 나뉜 3회 반복에서 기대 4,900건 전부 도착, 누락·중복·순서 위반 0건
- **N+1 제거**: 채팅방 목록이 방 개수만큼 쿼리를 날리던 것을 JPQL 프로젝션과 IN 배치로 모아 방 50개 기준 101회 → 3회 고정
- **인덱스 설계**: 커서 페이지네이션 · 멱등성 · unread 쿼리를 EXPLAIN ANALYZE 로 분석해 인덱스 5개 추가, 이미 커버되는 3개는 근거를 적고 추가하지 않음
- **부하 측정**: 200 VU 조회 부하 3회 반복에서 RPS 1,806–1,940 · p95 129–133ms · 39.8만 요청 중 HTTP 실패 0건
- **재연결 보충**: 끊겼다 돌아온 사용자가 마지막 수신 ID 를 기준으로 놓친 구간만 따라잡도록 구현

🔗 https://github.com/sjh9714/realtime-chat

<br/>

## ✍️ Recent Posts

<!-- BLOG-POST-LIST:START -->
- [내 클로드 코드 세팅](https://sjh9714.tistory.com/15) <sub>2026.08.17</sub>
- [코딩 장벽은 사라졌는데, 다른 벽이 보이기 시작했다 - 바이브 코딩 6개월](https://sjh9714.tistory.com/14) <sub>2026.08.11</sub>
- [AI 슬롭 - 품질이 아니라 신뢰가 문제다](https://sjh9714.tistory.com/13) <sub>2026.08.10</sub>
- [컴퓨터구조 다시 공부해보기](https://sjh9714.tistory.com/12) <sub>2026.08.10</sub>
- [요즘 자꾸 보이는 하네스, 루프, 그래프가 뭔지 공부해봤다](https://sjh9714.tistory.com/11) <sub>2026.08.08</sub><!-- BLOG-POST-LIST:END -->

<br/>
