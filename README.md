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

<br/>

## 📂 Key Projects

### 1. FinMate | 20대의 첫 금융 온보딩 서비스
> **Role:** Backend · **기간:** 2026.04 ~ 2026.08 · **팀:** 4인 (기획 2 · 풀스택 1 · 데이터 1)

- **API 서버 단독 구현**: Java · Spring · PostgreSQL 로 서비스 API 전 범위 설계·구현, 저장소 커밋의 98% 담당
- **통합 테스트 환경 구축**: Testcontainers 로 실제 PostgreSQL 을 띄워 검증하는 통합 테스트 50개 작성
- **저장소 분리**: 웹앱 · API · 데이터 파이프라인을 세 저장소로 나눠 배포 주기를 분리
- **문제 정의 근거 확보**: 20대 97명 설문으로 "필요는 아는데 시작을 못 한다"는 지점을 특정하고, 108명에게 화면을 보여주며 가설 검증
- **주제 전환 대응**: 3개월 쓰던 주제를 버리고 닷새 만에 서비스를 다시 세움

🔗 https://github.com/gaga-studio/finmate-app
🔗 [회고 — 3개월을 버리고, 5일 만에 다시 만들었다](https://sjh9714.tistory.com/2)

<br/>

### 2. My ETA | 교통약자를 위한 배리어프리 길찾기
> **Role:** Backend · **기간:** 2026.07 ~ 2026.08 · **팀:** 7인 (하나금융그룹 x SK텔레콤 Tech4Good)

- **개인화 ETA 보정**: 표준 보행속도 대신 사용자의 평소 속도와 안내 중 수집한 유효 속도 표본으로 도보 구간 도착시간을 다시 계산
- **공공데이터 연동**: 서울 버스·지하철 실시간 도착정보, 저상버스 여부, 엘리베이터 접근성 정보를 경로에 반영
- **미확인 정보 표기 규칙**: 확인되지 않은 시설 정보를 이용 가능으로 단정하지 않고 `UNKNOWN` 상태로 노출
- **재탐색 처리**: 경로 이탈과 대중교통 놓침을 감지해 현재 위치 기준으로 경로와 ETA 를 다시 계산

🔗 https://github.com/tech4good-2026/eta
🔗 [회고 — 잘 만드는 것과 보여주는 건 다른 일이었다](https://sjh9714.tistory.com/1)

<br/>

### 3. Backend Portfolio | 수치와 근거를 검사로 묶은 포트폴리오
> **Role:** 개인 프로젝트 · **배포:** [sjh9714.vercel.app](https://sjh9714.vercel.app)

- **근거 대장 도입**: 화면에 싣는 모든 수치의 출처를 프로젝트별 대장 파일로 두고, 대장에 없는 수치는 화면에 못 나가게 함
- **글 린트 구현**: 문체 · 표기 · 구조 · 근거 · 금지 수치 · 링크 · 산출물 해시까지 10가지를 검사하는 린트 작성
- **e2e 이중 검사**: 린트는 소스를, Playwright 는 렌더된 화면을 본다. 컴포넌트나 alt 텍스트로 새어 나온 금지 수치는 e2e 가 잡음
- **근거 링크 고정**: 브랜치가 아니라 커밋 SHA 로 걸어, 저장소가 바뀔 때 근거만 조용히 달라지는 것을 막음
- **정적 배포**: Next.js 정적 내보내기로 빌드해 Vercel 에 배포

🔗 https://github.com/sjh9714/backend-portfolio

<br/>

### 4. Student Start Mode | 유학생 금융 온보딩
> **Role:** 기획 · 프로토타입 · **기간:** 2026.04 ~ 2026.05 · **팀:** 4인 (청년 금융인재 예선 통과작)

- **문제 정의**: 유학생이 입국 직후 비자 · ARC · 휴대폰 · 계좌 · 카드 · 송금처럼 서로 의존하는 절차를 짧은 기간에 처리해야 하는 상황을 대상으로 삼음
- **상태 기반 체크리스트 설계**: 정보를 모아 보여주는 대신 지금 가능 / 다음 단계 / 잠김 으로 나눠, 현재 상태에서 할 수 있는 것만 앞에 둠
- **상태 변화 반영**: ARC 수령 같은 변화가 생기면 잠긴 항목을 풀고 다음 작업을 안내하는 흐름 구성
- **역할 분리**: 판단은 상태와 규칙이 하고, AI 채팅은 세부 질문을 돕는 보조로 한정

🔗 https://github.com/sjh9714/Student_Start_Mode_demo

<br/>

### 5. 추억 앨범 | 멋쟁이사자처럼 12기 데모데이
> **Role:** Backend · **기간:** 2024.12 · **팀:** 7인

- **API 구현**: 인증 · 앨범 · 편지 · 사진 API 설계와 구현
- **배포**: AWS 배포 담당

🔗 https://github.com/sjh9714/memory_of_year

<br/>

### 6. BorrowMe | 교내 물품 대여 서비스
> **Role:** Backend · **기간:** 2024.07 · **팀:** 11인 (GGUM 해커톤, 2일)

- **알림 기능 담당**: 요청부터 반납까지 대여 생명주기를 다루는 Spring Boot API 중 알림 파트 구현

🔗 https://github.com/sjh9714/borrow_me

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
