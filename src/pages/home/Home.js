import React, { useEffect } from "react";
import { fetchFacilityData } from "../../api";
// api.js 파일에서 함수 가져오기

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const result = await fetchFacilityData({ pageNo: 1, numOfRows: 10 });
        console.log("API 데이터:", result); // 데이터를 콘솔에 출력
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번 실행

  return (
    <div>
      <h1>Home</h1>
      <p>콘솔에서 데이터를 확인하세요!</p>
    </div>
  );
};

export default Home;
