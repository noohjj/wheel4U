import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WheelData } from "../../api";  // API 호출 함수

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({ imgUrl: "", subject: "", contents: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터를 API로부터 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // 로딩 시작
        const fetchedData = await WheelData(id);  // API 호출
        console.log("API Response:", fetchedData);

        // 응답 데이터가 있으면 상태 업데이트
        if (fetchedData) {
          setData({
            imgUrl: fetchedData.imgUrl || "https://via.placeholder.com/300",  // 기본 이미지
            subject: fetchedData.subject || "제목 없음",  // 기본 제목
            contents: fetchedData.contents
              ? fetchedData.contents.replace(/!R!!N!/g, "").replace(/\n/g, "")  // HTML 태그 정리
              : "내용 없음",  // 기본 내용
          });
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);  // 로딩 종료
      }
    };

    fetchData();  // API 호출
  }, [id]);  // id가 변경될 때마다 API 호출

  // 로딩 중이면 로딩 표시
  if (loading) return <div>로딩 중...</div>;

  // 에러 발생 시 에러 메시지 출력
  if (error) return <div>{error}</div>;

  console.log("Rendered State:", data);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Wheel4U</h1>
      <div>
        <img
          src={data.imgUrl}  // 받아온 이미지 URL 사용
          alt={data.subject}  // 제목을 alt로 설정
          onError={(e) => (e.target.src = "https://via.placeholder.com/300")}  // 이미지 오류 시 대체 이미지
          style={{ width: "300px", height: "300px", objectFit: "cover" }}  // 이미지 스타일
        />
      </div>
      <h2>{data.subject}</h2>  {/* 제목 */}
      <div dangerouslySetInnerHTML={{ __html: data.contents }}></div>  {/* HTML 콘텐츠 출력 */}
    </div>
  );
};

export default Detail;