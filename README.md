# 맛집 관리 CRUD 서비스

Fetch API와 MockAPI로 맛집 정보를 조회, 추가, 수정, 삭제하는 웹 서비스입니다.

## Deployment

- GitHub URL: https://github.com/shkim2104/oss_week9 , https://github.com/2026-2-OSS/assign09-c01-22300133
- Vercel URL: https://ossweek9-assign.vercel.app/indexx.html
- MockAPI Endpoint URL: https://6ae7413156b2ee1e54403e32.mockapi.io/restaurants

## Service

- 주제: 맛집 관리
- Field: `id`, `name`, `category`, `location`, `menu`, `rating`

| 기능 | Method | 설명 |
|---|---|---|
| 조회 | GET | 페이지 시작 시 목록을 불러와 표에 출력 |
| 추가 | POST | Form 입력값을 서버에 저장하고 목록 갱신 |
| 수정 | PUT | 기존 데이터를 Form에 불러온 뒤 수정 내용을 서버에 반영 |
| 삭제 | DELETE | `confirm()` 확인 후 서버 데이터 삭제 |

- Validation: 이름, 종류, 위치, 메뉴 빈 값 검사와 평점 범위(1~5) 검사를 추가와 수정에 모두 적용
- 검색: `filter()`로 이름 또는 종류 검색
- 오류 처리: 요청 실패 시 화면에 오류 메시지 표시

## Key Learning

1. **fetch()와 response.ok**: `fetch()`는 404나 500 응답에서도 오류를 던지지 않기 때문에 `response.ok`를 직접 확인해야 한다.
2. **async/await와 JSON**: `await`로 응답을 기다린 뒤 `response.json()`으로 변환하고, 서버로 보낼 데이터는 `JSON.stringify()`로 문자열로 바꾼다.
3. **REST API**: 같은 URL이라도 GET, POST, PUT, DELETE 등 Method에 따라 동작이 달라지고, 특정 데이터는 URL 끝에 id를 붙여 지정한다.

## AI / Search Usage

- 도구: claude
- 사용 목적: readme 작성
- 참고 또는 반영한 기능: 검색 기능 구현할때 이해를 잘 하지 못하여 사용했습니다.
- 직접 수정한 내용: get 을 수정할때 
- 배운 점: js파일을 수정할때 자바랑 같이 예외처리하는 부분에서 비슷하다는 것을 느끼고 하지 않으면 오류가 많이 생길 수 있기에 잘 생각해서 코드를 짜야 겠다는 생각이 들었습니다.
- 본인 추정 AI 코드 기여율(%): 40%

## Problem & Solution / Reflection

- Problem: 하나의 Form으로 추가와 수정을 모두 처리해야 했다.
- Solution: `editingId` 변수로 수정 중인지 구분해서 URL과 Method(POST/PUT)를 나누었다.
- Problem: 데이터를 추가, 수정, 삭제한 뒤 화면이 서버 데이터와 달라질 수 있었다.
- Solution: 요청이 성공하면 `loadRestaurants()`를 다시 호출해 서버의 최신 목록을 출력했다.

