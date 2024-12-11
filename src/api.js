import axios from "axios";
import xml2js from "xml2js";

// 기본 URL과 서비스 키
const baseUrl =
  "http://apis.data.go.kr/B554287/DisabledPersonConvenientFacility";

const ServiceKey =
  "1l64t6Bdj%2FETCziwk1dAKNoPCXX%2BU77BE9UDSsFYQmEfO7%2Be79daO3HTK5T6dFPGIB9PNzP7%2BJlqq1j3YbcBiA%3D%3D";

// API 요청 함수
export const fetchFacilityData = async (params = {}) => {
  try {
    // 기본 요청 파라미터 설정
    const defaultParams = {
      ServiceKey: ServiceKey,
      type: "xml", // XML 형식으로 데이터 요청
      ...params,
    };

    // API 호출
    const response = await axios.get(baseUrl, { params: defaultParams });

    // XML 데이터를 JSON으로 변환
    const jsonResult = await xml2js.parseStringPromise(response.data, {
      explicitArray: false, // 배열을 자동으로 처리하지 않음
    });

    return jsonResult;
  } catch (error) {
    console.error("Error fetching facility data:", error);
    throw error;
  }
};
