import React, { useRef } from "react";

import SmsIcon from "@material-ui/icons/Sms";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SettingsIcon from "@material-ui/icons/Settings";
import "./ToolBox.css";

export default function ToolBox({ clickToolBoxSideBar }) {
  const currentRef = useRef(null);

  const handleClick = (e, state) => {
    Array.from(currentRef.current.children).forEach((item, index) => {
      currentRef.current.children[index].style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      // currentRef.current.children[index].childNodes[0].style.color = "red";
      if (currentRef.current.children.length - 1 === index) {
        e.currentTarget.style.backgroundColor = "#1c9dea";
      }
    });

    clickToolBoxSideBar(state);
  };

  return (
    <div className="nav__toolBox_container">
      <ul ref={currentRef} className="nav__toolBox_list">
        {/* default checked */}
        <li
          className="nav__toolBox_item"
          onClick={(e) => handleClick(e, "message")}
          style={{ backgroundColor: "#1c9dea" }}
        >
          <SmsIcon className="nav__toolBox_item_logo" />
        </li>
        <li className="nav__toolBox_item" onClick={(e) => handleClick(e, "group")}>
          <PeopleAltIcon className="nav__toolBox_item_logo" />
        </li>
        <li className="nav__toolBox_item" onClick={(e) => handleClick(e, "contact")}>
          <RecentActorsIcon className="nav__toolBox_item_logo" />
        </li>
        <li className="nav__toolBox_item" onClick={(e) => handleClick(e, "setting")}>
          <SettingsIcon className="nav__toolBox_item_logo" />
        </li>
      </ul>
    </div>
  );
}
