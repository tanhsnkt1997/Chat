import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./SideBar.css";
const Chat = lazy(() => import("./chat/chat.jsx").catch(() => console.log("Error in importing Chat.")));
const Setting = lazy(() => import("./setting/setting.jsx").catch(() => console.log("Error in importing Setting.")));
const Contact = lazy(() => import("./contact/contact").catch(() => console.log("Error in importing Contact.")));
const Group = lazy(() => import("./group/group").catch(() => console.log("Error in importing Group.")));

const SideBar = ({ clickToolBox, setOpenNavbar, openNavbar, matchesDownSm }) => {
  const currenRoomId = useSelector((state) => state.room.currentRoom?._id);
  const datas = [
    { type: "message", component: <Chat setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} /> },
    { type: "setting", component: <Setting setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} /> },
    { type: "contact", component: <Contact setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} /> },
    { type: "group", component: <Group setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} /> },
  ];
  return (
    <SideBarStyle matchesDownSm={matchesDownSm} currenRoomId={currenRoomId}>
      <Suspense fallback={<></>}>
        {datas.map(
          (data, index) =>
            data.type === clickToolBox && (
              <div style={{ width: "100%", height: "100%", overflow: "hidden" }} key={index}>
                {data.component}
              </div>
            )
        )}
      </Suspense>
    </SideBarStyle>
  );
};

export default React.memo(SideBar);

const SideBarStyle = styled.div`
  min-width: 320px;
  display: ${(props) => ((props.matchesDownSm && !props.currenRoomId) || !props.matchesDownSm ? "initial" : "none")};
  width: ${(props) => (props.matchesDownSm ? "100%" : "25%")};
  height: 100vh;
  padding: ${(props) => (props.matchesDownSm ? "2px" : "20px 25px")};
  border-right: ${(props) => props.theme.borderBase};
`;
