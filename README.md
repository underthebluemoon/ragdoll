# rag-doc-assistant

> 과거 사내 문서를 검색해 새 문서 작성에 활용하는, **"쓰기 위한 검색"** 도구
> (단순 Q&A 챗봇이 아님 — 권한·출처·원본 보존을 통제하는 사내 문서 AI)
> https://www.notion.so/RAG-375c9e6e731080e08ffdf2afe2da1ac1?source=copy_link

🚧 **In Progress** — 설계 · 환경 세팅 중

## 핵심
- **권한 누수 차단**: 검색 단계에서 권한을 필터링해, AI는 권한 있는 문서만 받음
- **원본 불변**: AI 생성물은 새 버전으로 저장, 원본엔 손대지 않음
- **전 행동 로깅**: 누가·언제·무엇을 읽고 썼는지 기록

## 기술 스택 (예정)
- **Frontend**: React, TypeScript, Vite
- **Backend**: Java 25, Spring Boot, Spring AI, Spring Data JPA, Gradle (Kotlin DSL)
- **Database**: PostgreSQL + pgvector
- **Auth**: JWT

## 구조
rag-doc-assistant/
├── backend/    # Spring Boot
└── frontend/   # React + TypeScript

