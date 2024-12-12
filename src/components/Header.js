import styled from "styled-components";
import Logos from "../image/MainLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { mainStyle } from "../GlobalStyled";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  padding: 15px ${mainStyle.moPadding};
  width: 100%;
  height: 80px;
  border-bottom: 3px solid rgba(19, 168, 158, 0.5);
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
  return (
    <Wrap>
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
