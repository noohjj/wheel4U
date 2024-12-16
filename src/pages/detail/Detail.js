import { useEffect, useState } from "react";
import { WheelData } from "../../api"; // API 호출 함수
import { useParams } from "react-router-dom"; // URL 파라미터
import styled from "styled-components"; // 스타일링 라이브러리
import { mainStyle } from "../../GlobalStyled"; // 글로벌 스타일

const Container = styled.div`
  padding: 0 ${mainStyle.moPadding};
`;

const Bg = styled.div`
  width: 100%;
  height: 300px;
  background: ${(props) => `url(${props.url}) no-repeat center / cover`};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 20px;
`;

const Content = styled.p`
  font-size: 1rem;
  margin-top: 10px;
  color: #333;
`;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await WheelData(id); // API에서 데이터 가져오기
        console.log("Fetched Data:", fetchedData); // API 응답 구조 확인

        // API 응답 구조에 맞게 데이터를 추출
        if (
          fetchedData?.response?.body?.items &&
          Array.isArray(fetchedData.response.body.items)
        ) {
          setData(fetchedData.response.body.items[0]); // 첫 번째 항목만 사용
        } else {
          setData(null); // "items"가 없으면 null로 설정
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData(null); // 오류 발생 시 null로 설정
      }
    };

    fetchData();
  }, [id]);

  // 로딩 중일 때 표시
  if (data === null) {
    return <p>Loading...</p>;
  }

  // 데이터가 있으면 렌더링
  return (
    <Container>
      {data ? (
        <div>
          {/* 배경 이미지 표시 */}
          <Bg url={data.imgUrl || "https://via.placeholder.com/150"} />
          {/* 제목 표시 */}
          <Title>{data.subject}</Title>
          {/* HTML 콘텐츠 표시 */}
          <Content dangerouslySetInnerHTML={{ __html: data.contents }} />
        </div>
      ) : (
        <p>No data available.</p> // 데이터가 없으면 표시
      )}
    </Container>
  );
};

export default Detail;
