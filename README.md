## [TripStory] 한국관광공사 관광정보 서비스 API 활용 여행지 검색서비스 개발

![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/e559ddb7-4c5b-4a28-8903-027d4bef3db6)

### 개발인원 : 1인 개발
FrontEnd 및 BackEnd 모두 구현

### 배포페이지 : https://tripstory.netlify.app/ (현재 버그가 있을 수 있습니다.)
 - FrontEnd : Netlify
 - BackEnd : CloudType

### 활용 API : 한국관광공사_국문 관광정보 서비스_GW

https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578

### Tech

 - FrontEnd : React.js, JavaScript, Zustand
 - BackEnd : Nodejs, Express
 - Database : MongoDB 

### 기능
현재 구현 중에 있는 점 참고부탁드립니다.

1. 회원기능
Express서버를 구축하고 MongoDB를 연동하여 유저스키마를 생성하고 유저정보를 테이블에 저장합니다.
회원가입 시 입력한 비밀번호는 암호화하여 데이터베이스에 저장할 수 있도록 하였습니다.

![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/56b268e9-e20a-4539-93d5-0ea3afc17eb3)
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/61c99c5b-4969-4373-95d3-4eee95f0d074)
회원가입 및 로그인이 가능합니다.<br>
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/d8eb5721-d966-4188-9bfe-9cd2b69d8c39)
로그인 성공 시 상단메뉴바에 유저정보를 표시합니다.<br>
<br>
2. 마이페이지 내 유저정보 조회 및 수정기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/7bf09844-e512-4667-98bb-5e6052641a34)
상단 메뉴바에서 '내 정보'를 클릭하면 마이페이지로 이동합니다.
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/69d17399-103b-42e1-a0c6-dc5ea19d4a77)
'회원정보수정'버튼을 클릭하면 회원정보를 수정할 수 있습니다.
<br>
3. 키워드 검색 및 지역별 검색 기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/17181e11-e526-49a6-8b43-b46876391dd2)
키워드 검색의 경우 상단메뉴바에 있는 검색창을 통해 찾고자 하는 키워드를 입력하여 검색할 수 있도록 구현하였습니다.<br>
그리고 지역별 검색 기능을 통해 도별로 검색할 수 있도록 구현하였습니다.<br>
<br>
4. 축제 등 행사정보 조회 기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/d1506cb0-ba3b-45eb-a23f-394f4f00e68c)
좌측 메뉴바에 위치한 '행사정보' 메뉴를 통해 축제정보를 조회할 수 있습니다.<br>
<br>
5. 숙박지 정보 조회 기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/d68a0d08-093a-4f8d-8fcf-92f5b1a0e008)
좌측 메뉴바에 위치한 '숙박정보' 메뉴를 통해 숙박지 정보를 조회할 수 있습니다.<br>
<br>
6. 지도 검색 기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/5920bfc4-c5fe-4e9c-a7f5-0f3c90f8b0f1)
지도에서 특정 위치를 클릭하면 기준좌표 기준 주변반경 1000m 내에 있는 여행지 정보가 지도에 표시됩니다.<br>
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/427fd2e3-44a6-4c14-aa20-3ea38a03aaad)
각 마커를 클릭하면 해당 여행지의 요약정보가 위와 같이 표시됩니다.<br> 
<br>
7. 상세페이지
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/870d90e4-5681-4532-840f-2e338b081086)
검색된 여행지 카드를 클릭하면 해당 여행지의 상세정보페이지로 이동합니다.<br>
이 페이지에서는 지역명, 소개정보, 위치표시, 리뷰정보 등을 확인할 수 있습니다.<br>
<br>
8. 등록된 리뷰조회 및 리뷰작성 기능
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/d53e3354-87e2-4094-9814-47177aca9c87)
<br>리뷰 작성하기 버튼을 클릭하면 아래와 같이 리뷰작성폼을 표시합니다.<br>
![image](https://github.com/ykkim97/tourKorea-search/assets/17917009/957b1f31-deb2-46da-8aee-62852253080e)
<br>

