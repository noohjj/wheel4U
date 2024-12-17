import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"; // FontAwesome 아이콘을 삭제 아이콘으로 변경

const Wrap = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
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

  ${({ expanded }) =>
    expanded &&
    `
    padding-bottom: 30px;
  `}
`;

const ConTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: red;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: darkred;
  }
`;

const ConContent = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 20px;
  cursor: pointer;
`;

const NoBookmarkMessage = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  color: #888;
`;

const Bookmark = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  // 페이지 로드 시 북마크된 항목 불러오기
  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarkedItems(savedBookmarks);
  }, []);

  // 항목 삭제 함수
  const handleDelete = (index) => {
    const updatedBookmarks = bookmarkedItems.filter(
      (item, itemIndex) => itemIndex !== index
    );
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
  };

  // cleanContent 함수 수정: content가 undefined인 경우를 처리
  const cleanContent = (content) => {
    if (content) {
      return content.replace(/!R!!N!/g, "");
    }
    return "";
  };

  return (
    <Wrap>
      <Title>북마크</Title>
      {bookmarkedItems.length === 0 ? (
        <NoBookmarkMessage>북마크한 항목이 없습니다.</NoBookmarkMessage>
      ) : (
        <ConWrap>
          {bookmarkedItems.map((item, index) => (
            <Con key={index}>
              <TitleWrap>
                <ConTitle>{item.subject}</ConTitle>
                <DeleteIcon
                  icon={faTrashAlt}
                  onClick={() => handleDelete(index)}
                />
              </TitleWrap>

              <ConContent
                dangerouslySetInnerHTML={{
                  __html: cleanContent(item.contents),
                }}
              />

              {item.imgUrl && <Image src={item.imgUrl} alt={item.subject} />}
            </Con>
          ))}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default Bookmark;
