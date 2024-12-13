import { useForm } from "react-hook-form";
import { useState } from "react";
import { data } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";

const Wrap = styled.div`
  padding: 0 ${mainStyle.moPadding};
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
    </Wrap>
  );
};

export default Search;
