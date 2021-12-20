import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const LayoutBodyItem = ({ children, name, icon }) => {
  const [isShow, setIsShow] = useState(false);
  const firstLoad = useRef(null);

  useEffect(() => {
    firstLoad.current = true;
  }, []);

  return (
    <div className="sideBar_setting_body_about_container">
      <div className="sideBar_setting_body_about">
        <div className="sideBar_setting_body_about_head">
          {icon}
          <span className="sideBar_setting_body_about_head_title">{name}</span>
        </div>
        {!isShow ? (
          <KeyboardArrowDownIcon
            className="sideBar_setting_body_attchment"
            onClick={() => setIsShow((state) => !state)}
            style={{ background: "red" }}
          />
        ) : (
          <KeyboardArrowUpIcon
            className="sideBar_setting_body_attchment"
            onClick={() => setIsShow((state) => !state)}
            style={{ background: "red" }}
          />
        )}
      </div>

      <div
        className={`sideBar_setting_body_about_content ${
          isShow === true && "sideBar_setting_body_about_content_click"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(LayoutBodyItem);
