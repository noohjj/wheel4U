import { useEffect, useState } from "react";
import { WheelData } from "../../api";
import Banner from "../../components/Banner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const LocateData = [
  {
    id: 0,
    imgUrl:
      "https://i.namu.wiki/i/2ZRGg-gam-lobms3prdtS4sWjhkIbmBXNGgzms8HmKraLmP6B7rsuFy0s7jP26RpYI4DaWYX-CTVGl2nA7ucgg.svg",
    locateNm: "부산진구",
  },
  {
    id: 1,
    imgUrl:
      "https://i.namu.wiki/i/neZy_eZ7Pb7jLigNqaEuVuPXYeq2uv2JFrOv4z78SzrNmLiJ6EMJZg5GaJvpsBReYdbAHzVmd_fNRJTI-BrKOQ.svg",
    locateNm: "동구",
  },
  {
    id: 2,
    imgUrl:
      "https://i.namu.wiki/i/5pj9Gz8wjf61Be3bolBE-WgW5NiTDIZEjuMBpG9wbclBIfHjnU2XeaCGFYZ72pEY4wp-kpWlNQx6EeUVW1uNwA.svg",
    locateNm: "서구",
  },
  {
    id: 3,
    imgUrl:
      "https://i.namu.wiki/i/4LhHpuPzCsQCDgWiHR9wuY_sAeeFHcbHCknJ1Dh1XxLAtqV4hge_qkjwbW5dhmT-8AQ2fBga4BXIpo6nGdJD-Q.svg",
    locateNm: "남구",
  },
  {
    id: 4,
    imgUrl:
      "https://i.namu.wiki/i/WJR5Li4EZDR5cvv64mePnUdGpMKfYPhjkkha8JXtB3qSdIo2IXWouTOX40VLG0m4xn5swp5-E57tj92JW8Z7-A.svg",
    locateNm: "수영구",
  },
  {
    id: 5,
    imgUrl:
      "https://i.namu.wiki/i/EWVo7Jy20JezFOQ-fuOTWPS88vu1h3WQ4jM3sYlcPvS5zaOSOdg0iaOa_7-J0pTzFSi0kkBsQGdzyBnuixbzFQ.svg",
    locateNm: "해운대구",
  },
  {
    id: 6,
    imgUrl:
      "https://i.namu.wiki/i/u392FzDRhdq1eYOA63_5UI7dirCoUC0FwtJa-WB0rM98yxJBGGCnSh3i9K2F-PRE-hhzi6lI_7QDB-Lt6KjPOQ.svg",
    locateNm: "금정구",
  },
  {
    id: 7,
    imgUrl:
      "https://i.namu.wiki/i/jvEUV19CyrTg581ZMXKO4aCmL9m7D2GgP1TQQjDDgBlCj4-VMeyPiTNdaVBukQi4KiHwI5kO77IfNuYyRKcTaA.svg",
    locateNm: "기장군",
  },
  {
    id: 8,
    imgUrl:
      "https://i.namu.wiki/i/whPwEL9IGCONTwmpy8iacGUdDtMRsgRoHIfGq0o9KlvvD7JvGPsS1tS72Hu2EVjy-vq3n8cSWARMJB0Fo8SqBQ.svg",
    locateNm: "영도구",
  },
  {
    id: 9,
    imgUrl:
      "https://i.namu.wiki/i/1KxazpVd3weOkax8m6tOs5z_xZX4oNeDrcd_o5EARozmtiYdn-_OG9DJZVkfG7pCR8jKIxJ0IwWuKzFPJOEYDQ.svg",
    locateNm: "연제구",
  },
  {
    id: 10,
    imgUrl:
      "https://i.namu.wiki/i/Z6qqxlC1ydlVW7miW_uLGQRv3em-e0x5K4a1j7cqqnSVJwR-id_efX2vEsPK47dTyVqk4hwmXRm2I1tt2JI0uA.svg",
    locateNm: "강서구",
  },
  {
    id: 11,
    imgUrl:
      "https://i.namu.wiki/i/aCOUzXb0HzTjG0rQknuGcfwu8cc4U1YfoE26tugbq7qoWhBg81RmWibfEloABie3FAZRJSJsxmBBfTc88OOp1WNnq6iIKZPOaD6Fk7Lbu_YZdazcDCGgdjnXQW5RwAgoCBYKjFsz5cqiW1U8vQqcAQ.svg",
    locateNm: "북구",
  },
  {
    id: 12,
    imgUrl:
      "https://i.namu.wiki/i/sYkLRFwua6fZvY8_YRBH1fJlc0kbgzuvO5OkkgdfzaPG-RR9QCp56J3aUV7pg8ql9WqLRs3yxESJyH8Q6hUz3A.svg",
    locateNm: "동래구",
  },
  {
    id: 13,
    imgUrl:
      "https://i.namu.wiki/i/Upi6ssnjoDUEj1UYjkDHanIyY0NaQ6GbHU8qgAPgvQEGxx27dwz9DjgNpt2vI_czOSPKUWRZR3ixo4pM4bGVpw.svg",
    locateNm: "사하구",
  },
  {
    id: 14,
    imgUrl:
      "https://i.namu.wiki/i/cLwSiZdUIdnWzuD-GwfOW7QYgcX2G-P2bsjNFi1m7CBMulq6Hv1RPuVltc8In6_OvVedxpZsXvZRVcI_dJ3GwQ.svg",
    locateNm: "사상구",
  },
  {
    id: 15,
    imgUrl:
      "https://i.namu.wiki/i/hiaYOQf5GZaXtm_hs9zgQIkYZW8Hohd_-DxVhbYj-b-N4kc37Q-ztveZD7yUI16dHZJliX4_0roU9VFAxMsvh3nVxD2WD39wnlvsAsIbtVpVEfUmPTFj_e_cb8HaqdkjHgtNwLM-SEsyu3pNOk0RJw.svg",
    locateNm: "중구",
  },
];

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllWrap = styled.div`
  padding: 0 20px;
`;

const Text = styled.h3`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
`;
const ConWrap = styled.div`
  background-color: #f3f6f7;
  width: 180px;
  height: 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ConText = styled.h3`
  margin-top: 20px;
  color: #13a89e;
`;

const ConImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    height: 85px;
  }
`;

const Home = () => {
  const [wheel, setWheel] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const wheel = await WheelData();
        setWheel(wheel);
        console.log(wheel);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AllWrap>
      <PageTitle title="HOME" />
      <Wrap>
        <Banner />
      </Wrap>
      <Text>지역구별 찾기</Text>
      <Container>
        {LocateData.map((item) => (
          <Link to={`/location/${item.locateNm}`}>
            <ConWrap key={item.id}>
              <ConImg>
                <img src={item.imgUrl} alt={item.locateNm} />
              </ConImg>
              <ConText>
                <h3>{item.locateNm}</h3>
              </ConText>
            </ConWrap>
          </Link>
        ))}
      </Container>
    </AllWrap>
  );
};

export default Home;
