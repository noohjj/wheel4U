import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 360px;
  margin-top: 20px;
  position: relative;
  img {
    width: 100%;
    max-width: 400px;
    height: 360px;
    border-radius: 20px;
  }
`;

const Text = styled.h3`
  position: absolute;
  top: 20%;
  left: 10%;
  color: white;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 30px;
`;

const Banner = () => {
  return (
    <Wrap>
      <img
        src="https://img.freepik.com/premium-photo/silhouette-disabled-person-wheelchair-background-sunset-high-quality-photo_209729-2368.jpg"
        alt="배너이미지"
      />
      <Text>
        부산 시내의 편안한 관광여행, <br />
        wheel 4U가 함께합니다.
      </Text>
    </Wrap>
  );
};

export default Banner;
