import React, { useState, lazy, Suspense } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./Contact.css";
import Header from "./header/header.jsx";

const Request = lazy(() => import("./request/request").catch(() => console.log("Error in importing Request.")));
const Friend = lazy(() => import("./friend/friend").catch(() => console.log("Error in importing Friend.")));

const Contact = ({ setOpenNavbar, openNavbar }) => {
  const [type, setType] = useState("Friends");
  const [openType, setOpenType] = useState(false);

  const changeType = (typeSlect) => {
    type !== typeSlect && setType(typeSlect);
    setOpenType(false);
  };

  const data = [
    { type: "Invites", component: <Request /> },
    { type: "Friends", component: <Friend /> },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="sideBar__contact_container">
        {/*  */}
        <Header type={type} setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
        {/*  */}
        <div className="sideBar__contact_header_wraper">
          <div className="sideBar__contact_header_select">
            <div className="sideBar__contact_header_select_choose" onClick={() => setOpenType((state) => !state)}>
              <span className="sideBar__contact_header_select_choose_type">{type}</span>
              <ArrowDropDownIcon />
            </div>

            <ul className="sideBar__contact_header_select_content" style={{ display: openType ? "block" : "none" }}>
              <li className="sideBar__contact_header_select_content_item" onClick={() => changeType("Friends")}>
                Friends
              </li>
              <li className="sideBar__contact_header_select_content_item" onClick={() => changeType("Invites")}>
                Invites
              </li>
            </ul>
          </div>

          {/* <PersonAddOutlinedIcon className="sideBar__contact_header_icon" onClick={() => isOpenModal(true)} /> */}
        </div>

        {data.map(
          (item, index) =>
            item.type === type && (
              <div key={index} style={{ width: "100%", height: "100%" }}>
                <Suspense fallback={<></>}>{item.component}</Suspense>
              </div>
            )
        )}
      </div>
      {/* {openModal && <ModalAdd openModal={openModal} isOpenModal={isOpenModal} />} */}
    </div>
  );
};

export default React.memo(Contact);
