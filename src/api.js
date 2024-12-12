const fetch = require("node-fetch");

const baseUrl =
  "http://apis.data.go.kr/6260000/BusanFcltsDsgstInfoService/getFcltsDsgstInfo";

const servicekey =
  "1l64t6Bdj%2FETCziwk1dAKNoPCXX%2BU77BE9UDSsFYQmEfO7%2Be79daO3HTK5T6dFPGIB9PNzP7%2BJlqq1j3YbcBiA%3D%3D";

const allUrl = `${baseUrl}?serviceKey=${servicekey}&pageNo=1&numOfRows=994&resultType=json`;

const option = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const WheelData = () => {
  return fetch(allUrl, option)
    .then((res) => res.json())
    .then((data) => {
      console.log("API 데이터:", data); // API 응답 데이터 출력
      return data; // 응답 데이터 반환
    })
    .catch((error) => {
      console.log("API 호출 중 오류 발생:", error); // 오류가 발생했을 경우 출력
      return { results: [] }; // 오류 발생 시 빈 배열 반환
    });
};
