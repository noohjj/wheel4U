import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import PageTitle from "../../components/PageTitle";

const Wrap = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const ConWrap = styled.div`
  margin-top: 20px;
`;

const Con = styled.div`
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

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ConTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConContent = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
`;

const Sub = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 20px;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #e74c3c;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #c0392b;
  }
`;

const BookMark = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  // Component load 시 로컬 스토리지에서 북마크 목록을 가져오기
  useEffect(() => {
    try {
      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
      setBookmarkedItems(savedBookmarks);
    } catch (error) {
      console.error("북마크 불러오기 오류", error);
    }
  }, []);

  // 북마크 삭제 처리
  const handleDeleteBookmark = (subject) => {
    setBookmarkedItems((prev) => {
      const updatedBookmarks = prev.filter((item) => item.subject !== subject); // 제목으로 필터링하여 삭제
      localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const cleanContents = (contents) => {
    if (!contents) return "";
    const cleanedContents = contents.replace(/!R!!N!/g, "");
    const paragraphs = cleanedContents
      .split(/<\/?p>/)
      .filter((text) => text.trim() !== "");
    return paragraphs.join("<br>");
  };

  return (
    <Wrap>
      <PageTitle title="즐겨찾기" />
      <h2>즐겨찾기</h2>
      {bookmarkedItems.length === 0 ? (
        <p>즐겨찾기가 없습니다.</p>
      ) : (
        <ConWrap>
          {bookmarkedItems.map((item, index) => (
            <Con key={index}>
              <ConTitle>
                <span>{item.subject}</span>
                <DeleteIcon
                  icon={faTrashAlt}
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 상위 컨테이너로 전달되지 않도록 방지
                    handleDeleteBookmark(item.subject); // 삭제 처리 함수 호출
                  }}
                />
              </ConTitle>

              <ConContent
                dangerouslySetInnerHTML={{
                  __html: cleanContents(item.contents),
                }}
              />

              {item.imgUrl && <Image src={item.imgUrl} alt={item.subject} />}

              <Sub>북마크 상태: 추가됨</Sub>
            </Con>
          ))}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default BookMark;
