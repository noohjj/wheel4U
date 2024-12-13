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
  const { locateNm } = useParams();
  const decodedLocateNm = decodeURIComponent(locateNm); // URL 파라미터 디코딩
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await WheelData();
        console.log("API 데이터:", response);

        const wheelData = response.response?.body?.items || []; // 데이터 경로 확인
        console.log("wheelData:", wheelData);

        // `gubun` 또는 `contents` 필드를 기준으로 필터링
        const filteredData = wheelData.filter(
          (item) =>
            (item.gubun &&
              item.gubun.replace(/\s+/g, "").toLowerCase() ===
                decodedLocateNm.replace(/\s+/g, "").toLowerCase()) ||
            (item.contents &&
              item.contents
                .toLowerCase()
                .includes(decodedLocateNm.toLowerCase())) // 주소에서 찾기
        );

        console.log("filteredData:", filteredData);
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [decodedLocateNm]);

  return (
    <Wrap>
      <Title>{decodedLocateNm}</Title>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : data.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <CardList>
          {data.map((item, index) => (
            <Card key={index}>
              <CardContent>
                <Subject>{item.subject}</Subject>
                <Info>{item.contents}</Info>
              </CardContent>
              <BookmarkIcon>☆</BookmarkIcon>
            </Card>
          ))}
        </CardList>
      )}
    </Wrap>
  );
};

export default Location;
