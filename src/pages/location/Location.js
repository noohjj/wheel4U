import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WheelData } from "../../api";

// 스타일 정의
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
    // API 호출
    (async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const response = await WheelData(); // API 호출
        console.log("API 전체 응답:", response);

        // items 배열 추출
        const items = response?.response?.body?.items?.item || []; 

        if (!Array.isArray(items)) {
          console.error("items가 배열이 아닙니다:", items);
          setData([]);
          return;
        }

        // 필터링 로직
        const filteredData = items.filter((item) => {
          const addressMatch = item.contents
            ?.toLowerCase()
            .includes(decodedLocateNm.toLowerCase()); // 주소 내 필터링
          const gubunMatch = item.gubun
            ?.toLowerCase()
            .includes(decodedLocateNm.toLowerCase()); // gubun 필터링
          return addressMatch || gubunMatch;
        });

        console.log("filteredData:", filteredData);
        setData(filteredData); // 필터링된 데이터 저장
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]); // 오류 발생 시 빈 배열 설정
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    })();
  }, [decodedLocateNm]);

  // HTML에서 필요한 정보만 추출하는 함수
  const extractContents = (contents) => {
    if (!contents) return ""; // 내용이 없을 경우 빈 문자열 반환

    // <p> 태그로 구분된 데이터를 배열로 변환
    const paragraphs = contents.split(/<\/?p>/).filter((text) => text.trim() !== "");

    // 필요한 데이터만 추출 (상호, 주소, 위치, 테이블 수, 주메뉴)
    const limitedContents = paragraphs.slice(0, 5).join("<br>"); // 5번째 줄까지만 가져옴

    return limitedContents;
  };

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
                <Info
                  dangerouslySetInnerHTML={{ __html: extractContents(item.contents) }} // HTML 콘텐츠 처리
                ></Info>
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