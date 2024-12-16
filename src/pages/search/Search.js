import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { WheelData } from "../../api";
import { Link } from "react-router-dom";

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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ConTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled.div``;

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

const ConContent = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 5px;

  a {
    color: #13a89e;
    text-decoration: underline;
  }
`;

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedData = await WheelData();
        console.log("fetchedData:", fetchedData);

        const items = fetchedData?.response?.body?.items?.item || [];
        if (!Array.isArray(items)) {
          console.error("items가 배열이 아님:", items);
          setData([]);
        } else {
          setData(items);
        }
        setFilteredData(items);
      } catch (error) {
        console.error("API 호출 오류 발생:", error);
        setData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
      // finally : 항상 실행이 보장되어야 하는 코드, try 블록이 종료되면 실행되는 코드
    })();
  }, []);

  const onSearch = ({ search }) => {
    const keyword = search.trim().toLowerCase();
    // trim : 문자열 앞 뒤 공백 없에기 ex:"가 나 다 라 마"
    if (!keyword) {
      setFilteredData(data);
      return;
    }

    const results = data.filter((item) => {
      const fieldsToSearch = [
        item.subject,
        item.contents, // HTML 태그는 제거하지 않고 검색
        item.gubun,
        item.boardCodeNm,
      ];
      return fieldsToSearch.some(
        (field) => field?.toLowerCase().includes(keyword)
        // 소문자로 변환된 field에 검색어 keyword가 포함되어 있는지 확인.
      );
      // some: 배열 요소 중 하나라도 조건을 만족할 시 활성화(true 반환, 조건이 만족하지 않을 시 false)
    });

    setFilteredData(results);
  };

  return (
    <Wrap>
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
            <Link to={`/detail/${item.subject}`}>
              <Con key={index}>
                <Title>
                  <ConTitle>{item.subject}</ConTitle>
                  <ConContent
                    dangerouslySetInnerHTML={{ __html: item.contents }} // HTML을 직접 렌더링할 때 쓰이는 속성명
                  />
                </Title>
                <BookmarkIcon>☆</BookmarkIcon>
              </Con>
            </Link>
          ))}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default Search;
