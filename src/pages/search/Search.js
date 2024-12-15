import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";
import { WheelData } from "../../api"; // API 파일에서 WheelData를 가져옵니다.

const Wrap = styled.div`
  padding: 20px ${mainStyle.moPadding};
  background-color: #f9f9f9;
  border-radius: 8px;
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
    &:focus {
      outline: none;
      border-color: #1c7a74;
    }
  }
`;

const NoResultMessage = styled.h3`
  font-size: 18px;
  color: #999;
  text-align: center;
`;

const ConWrap = styled.div`
  margin-top: 20px;
`;

const Con = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ConTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ConContent = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [term, setTerm] = useState([]); // 검색 결과 저장
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  // 데이터 가져오는 함수
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await WheelData(); // API 호출
      const items = data?.response?.body?.items || []; // 응답 데이터에서 items 배열 추출

      // 데이터가 배열이라면
      if (Array.isArray(items)) {
        setTerm(items); // 데이터를 term 상태에 저장
      } else {
        setTerm([]); // 빈 배열로 초기화
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTerm([]); // 오류 발생 시 빈 배열
    } finally {
      setLoading(false);
    }
  };

  // 페이지 로딩 시 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  // 검색어를 입력한 후 검색 결과를 필터링
  const onSearch = async (data) => {
    const { search: keyword } = data;
    if (!keyword.trim()) {
      setTerm([]); // 검색어가 비어있으면 초기화
      return;
    }

    setLoading(true);
    try {
      const result = await WheelData(); // API 호출
      const items = result?.response?.body?.items || [];

      if (Array.isArray(items)) {
        // 검색어와 항목을 비교하여 필터링
        const filteredData = items.filter((item) =>
          item.subject.toLowerCase().includes(keyword.trim().toLowerCase()) // 대소문자 구분 없이 비교
        );
        setTerm(filteredData); // 필터링된 데이터로 상태 업데이트
      } else {
        setTerm([]); // items가 배열이 아니면 빈 배열
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTerm([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <Form onSubmit={handleSubmit(onSearch)}>
        <input
          {...register("search", {
            required: "검색어는 필수입니다.",
          })}
          type="text"
          placeholder="검색어를 입력해주세요"
        />
      </Form>

      {loading ? (
        <NoResultMessage>검색 중...</NoResultMessage>
      ) : term.length === 0 ? (
        <NoResultMessage>검색어에 맞는 결과가 없습니다</NoResultMessage>
      ) : (
        <ConWrap>
          {term.map((data, index) => (
            <Con key={index}>
              <ConTitle>{data.subject}</ConTitle>
              <ConContent>{data.contents && data.contents.slice(0, 100)}...</ConContent>
            </Con>
          ))}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default Search;