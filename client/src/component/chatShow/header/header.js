import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import NavUser from "./navUser/navUser";
import NavToolBox from "./navToolBox/navToolBox";
import Search from "./search.jsx";
import roomAction from "../../../redux/action/room";
import "./Header.css";

const Header = ({ setOpenRightBar, matchesDownSm }) => {
  const dispatch = useDispatch();
  const currenRoomId = useSelector((state) => state.room.currentRoom?._id);
  const [isSearch, setIsSearch] = useState(false);

  const handleGoBackList = () => {
    dispatch(roomAction.setCurrentRoom(null));
  };

  return (
    <HeaderChatShowStyle>
      {matchesDownSm && currenRoomId && (
        <div onClick={handleGoBackList} className="chatShow___header_back_wraper">
          <ArrowBackIosIcon className="chatShow___header_backIcon_wraper" />
        </div>
      )}
      <NavUser />
      <NavToolBox setIsSearch={setIsSearch} setOpenRightBar={setOpenRightBar} />
      <Search isSearch={isSearch} setIsSearch={setIsSearch} />
    </HeaderChatShowStyle>
  );
};

export default React.memo(Header);

const HeaderChatShowStyle = styled.div`
  position: relative;
  background: ${(props) => (props.theme.id === "dark" ? "#546dad" : "#fff")};
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0eff5;
  box-shadow: 0px 0px rgb(15 34 58 / 12%) 0px !important;
  padding: 20px 30px;
`;
