import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 360px;
  img {
    width: 400px;
    height: 360px;
    border-radius: 20px;
    position: relative;
  }
`;

const Banner = () => {
  return (
    <Wrap>
      <img
        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201810/11/2410ade7-bb62-4eb1-8ada-a3d08f8f414b.jpg"
        alt="배너이미지"
      />
    </Wrap>
  );
};

export default Banner;
