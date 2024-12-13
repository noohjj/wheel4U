import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WheelData } from "../../api";

// 스타일 정의 (변경 금지)
const Wrap = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #13a89e;
  margin-bottom: 20px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Card = styled.div`
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Subject = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Info = styled.p`
  font-size: 14px;
  margin: 0;
  color: #666;
`;

const BookmarkIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #13a89e;

  &:hover {
    color: #0f8073;
  }
`;

const Location = () => {
  const { locateNm } = useParams(); // URL 파라미터 가져오기
  const decodedLocateNm = decodeURIComponent(locateNm); // 디코딩
  const [data, setData] = useState([]); // 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API 호출 로직
    (async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const response = await WheelData(); // 데이터 호출
        console.log("API 데이터:", response); // API 응답 데이터 출력

        // 응답 데이터 구조 확인
        const wheelData = response?.response?.body?.items || []; // items가 배열인지 확인
        console.log("wheelData:", wheelData); // API 응답의 실제 데이터 구조 확인

        // wheelData가 배열일 경우 필터링
        if (Array.isArray(wheelData)) {
          const filteredData = wheelData.filter(
            (item) =>
              (item.gubun &&
                item.gubun.replace(/\s+/g, "").toLowerCase() ===
                  decodedLocateNm.replace(/\s+/g, "").toLowerCase()) ||
              (item.contents &&
                item.contents
                  .toLowerCase()
                  .includes(decodedLocateNm.toLowerCase())) // contents에서 찾기
          );

          console.log("filteredData:", filteredData); // 필터링된 데이터 확인
          setData(filteredData); // 필터링된 데이터 저장
        } else {
          console.error("wheelData가 배열이 아닙니다:", wheelData);
          setData([]); // 배열이 아니면 빈 배열 설정
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    })();
  }, [decodedLocateNm]);

  return (
    <Wrap>
      <Title>{decodedLocateNm}</Title>
      {isLoading ? (
        <p>로딩 중...</p> // 로딩 중 메시지
      ) : data.length === 0 ? (
        <p>데이터가 없습니다.</p> // 데이터가 없을 경우
      ) : (
        <CardList>
          {data.map((item, index) => (
            <Card key={index}>
              <CardContent>
                <Subject>{item.subject}</Subject>
                <Info>{item.contents}</Info> {/* contents에 포함된 주소 출력 */}
              </CardContent>
              <BookmarkIcon>☆</BookmarkIcon> {/* 북마크 아이콘 */}
            </Card>
          ))}
        </CardList>
      )}
    </Wrap>
  );
};

export default Location;
