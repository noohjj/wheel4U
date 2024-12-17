import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WheelData } from "../../api"; // API 호출 함수

const Detail = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 단일 객체 데이터를 가져옴
        const fetchedData = await WheelData(); // 단일 객체 반환
        console.log("API Response:", fetchedData);

        // fetchedData의 boardCode와 id를 비교
        if (fetchedData.boardCode === id) {
          setData({
            imgUrl: fetchedData.imgUrl || "https://via.placeholder.com/300",
            subject: fetchedData.subject || "제목 없음",
            contents: fetchedData.contents
              ? fetchedData.contents.replace(/!R!!N!/g, "").replace(/\n/g, "")
              : "내용 없음",
          });
        } else {
          setError("해당 데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Wheel4U</h1>
      <div>
        <img
          src={data?.imgUrl}
          alt={data?.subject}
          onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
        />
      </div>
      <h2>{data?.subject}</h2>
      <div dangerouslySetInnerHTML={{ __html: data?.contents }}></div>
    </div>
  );
};

export default Detail;
