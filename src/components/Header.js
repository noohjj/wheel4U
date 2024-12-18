import styled from "styled-components";
import Logos from "../image/MainLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { mainStyle } from "../GlobalStyled";
import { Link } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef } from "react";

const Wrap = styled.div`
  /* position: fixed; 화면에 고정
  top: 0; 상단에 배치
  left: 50%; 가운데 정렬 */
  /* transform: translateX(-50%); 수평으로 정확히 가운데에 배치 */
  padding: 15px ${mainStyle.moPadding};
  max-width: 450px; /* 화면 너비를 현재 스타일대로 제한 */
  width: 100%;
  height: 80px;
  border-bottom: 3px solid rgba(19, 168, 158, 0.5);
  background-color: #fff; /* 고정된 헤더 배경색 */
  z-index: 999; /* 다른 요소보다 위에 보이도록 */
  box-shadow: 0px 0px 5px 5px #e8eaf6; /* 기존 그림자 스타일 유지 */
`;

const SecWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Move = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  width: 50px;
  margin-top: 15px;
  color: #13a89e;
`;

const Header = () => {
  const headerRef = useRef();

  const scrollHandler = () => {
    const pageY = window.scrollY; // 현재 스크롤 위치
    const current = headerRef.current;

    if (pageY >= 300) {
      current.style.position = "fixed";
      current.style.top = "0"; // 화면 상단에 고정
      current.style.backgroundColor = "#fff";
    } else {
      current.style.position = "relative"; // 원래 위치로 복구
      current.style.top = "unset"; // `top` 해제
      current.style.backgroundColor = "transparent";
      current.style.filter = "blur(0px)";
      current.style.boxShadow = "none"; // 그림자 제거
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  });

  return (
    <Wrap ref={headerRef}>
      <SecWrap>
        <Link to="/">
          <Logos />
        </Link>

        <Move>
          <Link to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
          <Link to="/bookmark">
            <FontAwesomeIcon icon={faBookmark} />
          </Link>
        </Move>
      </SecWrap>
    </Wrap>
  );
};

export default Header;
