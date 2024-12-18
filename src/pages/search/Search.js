import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { WheelData } from "../../api";
import PageTitle from "../../components/PageTitle";

const Wrap = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  margin-bottom: 20px;
  input {
    all: unset;
    width: 100%;
    height: 60px;
    border-bottom: 3px solid #13a89e;
    font-size: 16px;
    padding-left: 10px;
  }
`;

const NoResultMessage = styled.h3`
  font-size: 18px;
  text-align: center;
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${({ isBookmarked }) => (isBookmarked ? "#f39c12" : "#13a89e")};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ isBookmarked }) => (isBookmarked ? "#e67e22" : "#0f8073")};
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

const Sub = styled.div`
  margin-top: 10px;
`;

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  // 초기 북마크 및 데이터 로드
  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || [];
    setBookmarkedItems(savedBookmarks);

    (async () => {
      setLoading(true);
      try {
        const fetchedData = await WheelData();
        const items = fetchedData?.response?.body?.items?.item || [];
        setData(Array.isArray(items) ? items : []);
        setFilteredData(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 북마크 핸들러
  const handleBookmarkClick = (item) => {
    setBookmarkedItems((prevItems) => {
      const isAlreadyBookmarked = prevItems.some(
        (bookmarkedItem) => bookmarkedItem.subject === item.subject
      );

      const updatedBookmarks = isAlreadyBookmarked
        ? prevItems.filter(
            (bookmarkedItem) => bookmarkedItem.subject !== item.subject
          )
        : [...prevItems, item];

      localStorage.setItem("bookmarkedItems", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const onSearch = ({ search }) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setFilteredData(data);
      return;
    }

    const results = data.filter((item) => {
      const fieldsToSearch = [
        item.subject,
        item.contents,
        item.gubun,
        item.boardCodeNm,
      ];
      return fieldsToSearch.some((field) =>
        field?.toLowerCase().includes(keyword)
      );
    });

    setFilteredData(results);
  };

  const onItemClick = (item) => {
    setExpandedItem(item.subject === expandedItem ? null : item.subject);
  };

  const cleanContent = (content) => {
    return content.replace(/!R!!N!/g, "");
  };

  return (
    <Wrap>
      <PageTitle title="검색" />
      <Form onSubmit={handleSubmit(onSearch)}>
        <input
          {...register("search", { required: false })}
          type="text"
          placeholder="검색어를 입력하세요"
        />
      </Form>

      {loading ? (
        <NoResultMessage>로딩 중...</NoResultMessage>
      ) : filteredData.length === 0 ? (
        <NoResultMessage>결과 없음</NoResultMessage>
      ) : (
        <ConWrap>
          {filteredData.map((item, index) => (
            <div key={index}>
              <Con
                expanded={expandedItem === item.subject}
                onClick={() => onItemClick(item)}
              >
                <Title>
                  <ConTitle>{item.subject}</ConTitle>
                  <BookmarkIcon
                    icon={faBookmark}
                    isBookmarked={bookmarkedItems.some(
                      (bookmarkedItem) =>
                        bookmarkedItem.subject === item.subject
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(item);
                    }}
                  />
                </Title>

                {expandedItem === item.subject ? (
                  <>
                    <ConContent
                      dangerouslySetInnerHTML={{
                        __html: cleanContent(item.contents),
                      }}
                    />
                    {item.imgUrl && (
                      <>
                        <Image src={item.imgUrl} alt={item.subject} />
                        <Sub>보유시설 : {item.setValueNm}</Sub>
                      </>
                    )}
                  </>
                ) : (
                  item.imgUrl && (
                    <>
                      <Image src={item.imgUrl} alt={item.subject} />
                      <Sub>보유시설 : {item.setValueNm}</Sub>
                    </>
                  )
                )}
              </Con>
            </div>
          ))}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default Search;
