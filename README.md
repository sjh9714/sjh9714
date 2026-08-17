<h1 align="center">성진혁</h1>
<h3 align="center">Backend Developer</h3>

<p align="center">
  <a href="https://sjh9714.vercel.app"><img src="https://img.shields.io/badge/Portfolio-000000?style=flat-square&logo=vercel&logoColor=white"/></a>
  <a href="https://sjh9714.tistory.com"><img src="https://img.shields.io/badge/Blog-000000?style=flat-square&logo=tistory&logoColor=white"/></a>
  <a href="mailto:jinhyuk9714@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white"/></a>
</p>

<br/>

## 🌱 Experience

- **가톨릭대학교 컴퓨터공학** | 재학 (2021.03 ~ )
- **하나금융그룹 x 금융감독원 청년 금융인재 양성 과정** | Backend (2026.04 ~ 2026.08)
- **멋쟁이사자처럼 대학 12기** | Backend (2024.03 ~ 2024.12)
- **GGUM 해커톤** | Backend (2024.07)

<br/>

## 📂 Key Projects

### 1. 좌석 예약 시스템 | 대기열 · 락 전략 · 이벤트 전달
> **Role:** 설계 · 구현 · 측정 전체 · **기간:** 2026.02 ~ 2026.05

- **중복 판매 차단**: 같은 좌석에 100명이 몰릴 때 나던 oversell 을 락 3종을 비교해 0건으로, p95 는 106–215ms 로 실측
- **경합 원인 규명**: 다른 좌석인데 예매가 서로 실패하던 원인이 잔여석 카운터 한 줄임을 밝혀 성공률 40% → 100%
- **매진 좌석 선필터**: 매진된 좌석 요청까지 DB 를 잡던 것을 Redis 에서 미리 걸러 쓰기 p95 37ms → 6ms, 총 RPS 969 → 1,005
- **대기열 전달**: 순번을 SSE 로 내려보내고, 토큰 응답이 유실돼 재요청해도 예매는 한 건만 생기도록 멱등 처리

🔗 https://github.com/sjh9714/backend-portfolio

<br/>

### 2. 실시간 채팅 서버 | 다중 인스턴스 · 영속화 · 전달 검증
> **Role:** 설계 · 구현 · 측정 전체 · **기간:** 2026.02 ~ 2026.05

- **전달 보장**: DB 커밋이 끝난 뒤에만 브로드캐스트하도록 순서를 강제. 50명이 두 인스턴스에 나뉜 3회 반복에서 기대 4,900건 전부 도착, 누락·중복·순서 위반 0건
- **N+1 제거**: 채팅방 목록이 방 개수만큼 쿼리를 날리던 것을 JPQL 프로젝션과 IN 배치로 모아 방 50개 기준 101회 → 3회 고정
- **인덱스 설계**: 커서 페이지네이션 · 멱등성 · unread 쿼리를 EXPLAIN ANALYZE 로 분석해 인덱스 5개 추가, 이미 커버되는 3개는 근거를 적고 추가하지 않음
- **부하 측정**: 200 VU 조회 부하 3회 반복에서 RPS 1,806–1,940 · p95 129–133ms · 39.8만 요청 중 HTTP 실패 0건
- **구독 버그 수정**: Redis 패턴 구독이 수신 채널명을 목적지로 쓰던 것을 payload 기준으로 고쳐 다른 방으로 새던 메시지를 막고 단위 테스트로 고정

🔗 https://github.com/sjh9714/backend-portfolio

<br/>

### 3. FinMate | 20대의 첫 금융 온보딩 서비스
> **Role:** Backend · **기간:** 2026.04 ~ 2026.08 · **팀:** 4인 (하나금융그룹 x 금융감독원 청년 금융인재)

- **API 서버 구현**: Java · Spring · PostgreSQL 로 서비스 API 전 범위 설계·구현
- **통합 테스트 환경**: Testcontainers 로 실제 PostgreSQL 을 띄워 검증하는 통합 테스트 50개 작성
- **저장소 분리**: 웹앱 · API · 데이터 파이프라인을 세 저장소로 나눠 배포 주기를 분리

🔗 https://github.com/gaga-studio/finmate-app

<br/>

### 4. My ETA | 교통약자를 위한 배리어프리 길찾기
> **Role:** Backend · **기간:** 2026.07 ~ 2026.08 · **팀:** 7인 (하나금융그룹 x SK텔레콤 Tech4Good)

- **개인화 ETA 보정**: 표준 보행속도 대신 사용자의 평소 속도와 안내 중 수집한 유효 속도 표본으로 도보 구간 도착시간을 다시 계산
- **공공데이터 연동**: 서울 버스·지하철 실시간 도착정보, 저상버스 여부, 엘리베이터 접근성 정보를 경로에 반영
- **미확인 정보 표기**: 확인되지 않은 시설 정보를 이용 가능으로 단정하지 않고 `UNKNOWN` 상태로 노출
- **재탐색**: 경로 이탈과 대중교통 놓침을 감지해 현재 위치 기준으로 경로와 ETA 를 다시 계산

🔗 https://github.com/tech4good-2026/eta

<br/>

### 5. Student Start Mode | 유학생 금융 온보딩
> **Role:** 기획 · 프로토타입 · **기간:** 2026.04 ~ 2026.05 · **팀:** 4인 (청년 금융인재 예선 통과작)

- **상태 기반 체크리스트**: 정보를 모아 보여주는 대신 지금 가능 / 다음 단계 / 잠김 으로 나눠, 현재 상태에서 할 수 있는 것만 앞에 둠
- **상태 변화 반영**: ARC 수령 같은 변화가 생기면 잠긴 항목을 풀고 다음 작업을 안내
- **역할 분리**: 판단은 상태와 규칙이 하고, AI 채팅은 세부 질문을 돕는 보조로 한정

🔗 https://github.com/sjh9714/Student_Start_Mode_demo

<br/>

## 🛠 Stack

**Languages**

![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

**Backend**

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white)

**Database**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**DevOps & Tools**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

<br/>

## ✍️ Recent Posts

<!-- BLOG-POST-LIST:START -->
- [내 클로드 코드 세팅](https://sjh9714.tistory.com/15)
- [코딩 장벽은 사라졌는데, 다른 벽이 보이기 시작했다 - 바이브 코딩 6개월](https://sjh9714.tistory.com/14)
- [AI 슬롭 - 품질이 아니라 신뢰가 문제다](https://sjh9714.tistory.com/13)
- [컴퓨터구조 다시 공부해보기](https://sjh9714.tistory.com/12)
- [요즘 자꾸 보이는 하네스, 루프, 그래프가 뭔지 공부해봤다](https://sjh9714.tistory.com/11)
<!-- BLOG-POST-LIST:END -->

<br/>

## 📬 Contact

<a href="mailto:jinhyuk9714@gmail.com">
  <img src="https://img.shields.io/badge/jinhyuk9714@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>
