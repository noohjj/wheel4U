import { useForm } from "react-hook-form";
import { useState } from "react";
import { data } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";

const Wrap = styled.div`
  padding: 20px ${mainStyle.moPadding};
`;

const Form = styled.form`
  margin-bottom: 20px;
  input {
    all: unset;
    width: 100%;
    height: 60px;
    border-bottom: 3px solid #13a89e;
  }
`;

const NoResultMessage = styled.h3``;

const ConWrap = styled.div``;

const Con = styled.div``;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [term, setTerm] = useState([]);

  const onSearch = async (data) => {
    const { search: keyword } = data;
    if (!keyword.trim()) {
      setTerm([]);
      return;
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

      {term.length === 0 ? (
        <NoResultMessage>검색어에 맞는 결과가 없습니다</NoResultMessage>
      ) : (
        <ConWrap>
          {term.map((data, index) => {
            <Con key={index}>{data.subject}</Con>;
          })}
        </ConWrap>
      )}
    </Wrap>
  );
};

export default Search;
