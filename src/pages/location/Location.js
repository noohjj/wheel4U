import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WheelData } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import PageTitle from "../../components/PageTitle";

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

const TextBox = styled.div`
  display: flex;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Card = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f3f6f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  height: auto;
  overflow: visible;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  padding-right: 30px;
  padding-bottom: 10px;
`;

const Subject = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  transition: height 0.3s ease;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
  object-fit: cover;
  max-height: 300px;
  border-radius: 20px;
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: ${({ isBookmarked }) => (isBookmarked ? "#f39c12" : "#13a89e")};
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ isBookmarked }) => (isBookmarked ? "#e67e22" : "#0f8073")};
  }
`;

const Sub = styled.div`
  margin-top: 10px;
  font-size: 15px;
`;

const Location = () => {
  const { locateNm } = useParams();
  const decodedLocateNm = decodeURIComponent(locateNm);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const navigate = useNavigate(); // useNavigate로 페이지 이동 처리

  // 초기 북마크 데이터 로드
  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarkedItems(savedBookmarks);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await WheelData();
        const items = response?.response?.body?.items?.item || [];

        if (!Array.isArray(items)) {
          console.error("items가 배열이 아닙니다:", items);
          setData([]);
          return;
        }

        const filteredData = items.filter((item) => {
          const addressMatch = item.contents
            ?.toLowerCase()
            .includes(decodedLocateNm.toLowerCase());
          const gubunMatch = item.gubun
            ?.toLowerCase()
            .includes(decodedLocateNm.toLowerCase());
          return addressMatch || gubunMatch;
        });

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [decodedLocateNm]);

  const cleanContents = (contents) => {
    if (!contents) return "";
    const cleanedContents = contents.replace(/!R!!N!/g, "");
    const paragraphs = cleanedContents
      .split(/<\/?p>/)
      .filter((text) => text.trim() !== "");
    return paragraphs.join("<br>");
  };

  // 북마크 클릭 핸들러
  const handleBookmarkClick = (e, item) => {
    e.stopPropagation();
    setBookmarkedItems((prevItems) => {
      const isAlreadyBookmarked = prevItems.some(
        (bookmarkedItem) => bookmarkedItem.subject === item.subject
      );

      if (isAlreadyBookmarked) {
        return prevItems; // 삭제 방지
      }

      const updatedBookmarks = [...prevItems, item];
      localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <Wrap>
      <PageTitle title="지역구별 찾기" />
      <Title>{decodedLocateNm}</Title>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : data.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <CardList>
          {data.map((item, index) => {
            const isBookmarked = bookmarkedItems.some(
              (bookmarkedItem) => bookmarkedItem.subject === item.subject
            );

            return (
              <Card
                key={index}
                onClick={() =>
                  setOpenCardIndex(openCardIndex === index ? null : index)
                }
              >
                <CardContent>
                  <TextBox>
                    <Subject>{item.subject}</Subject>
                    <BookmarkIcon
                      icon={faBookmark}
                      isBookmarked={isBookmarked}
                      onClick={(e) => handleBookmarkClick(e, item)}
                    />
                  </TextBox>
                  <Info
                    dangerouslySetInnerHTML={{
                      __html: cleanContents(item.contents),
                    }}
                    isOpen={openCardIndex === index}
                  />
                </CardContent>
                <Image src={item.imgUrl} alt={item.subject} />
                <Sub>보유시설 : {item.setValueNm}</Sub>
              </Card>
            );
          })}
        </CardList>
      )}
    </Wrap>
  );
};

export default Location;
