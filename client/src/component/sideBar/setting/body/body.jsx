import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DescriptionIcon from "@material-ui/icons/Description";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import LayoutBodyItem from "./layoutBodyItem.jsx";
import About from "./about/about.jsx";

import "./Body.css";

const Body = () => {
  return (
    <div className="sideBar_setting_body_container">
      {/* info */}
      <LayoutBodyItem
        name={"About"}
        icon={<PersonIcon className="sideBar_setting_body_about_head_icon" />}
      >
        <About />
      </LayoutBodyItem>
      {/*  */}
      <LayoutBodyItem
        name={"About"}
        icon={<PersonIcon className="sideBar_setting_body_about_head_icon" />}
      >
        <div className="sideBar_setting_body_about_content_file">
          <div className="sideBar_setting_body_about_content_file_first">
            <DescriptionIcon className="sideBar_setting_body_about_content_file_first_icon" />
          </div>
          <div className="sideBar_setting_body_about_content_file_second">
            <span className="sideBar_setting_body_about_content_file_second_type">Anh.zip</span>
            <span className="sideBar_setting_body_about_content_file_second_size">12.5 MB</span>
          </div>
          <div className="sideBar_setting_body_about_content_file_three">
            <GetAppOutlinedIcon className="sideBar_setting_body_about_content_file_three_icon" />
            <MoreHorizOutlinedIcon className="sideBar_setting_body_about_content_file_three_icon" />
          </div>
        </div>
        {/*  */}
        <div className="sideBar_setting_body_about_content_file">
          <div className="sideBar_setting_body_about_content_file_first">
            <DescriptionIcon className="sideBar_setting_body_about_content_file_first_icon" />
          </div>
          <div className="sideBar_setting_body_about_content_file_second">
            <span className="sideBar_setting_body_about_content_file_second_type">Anh.zip</span>
            <span className="sideBar_setting_body_about_content_file_second_size">12.5 MB</span>
          </div>
          <div className="sideBar_setting_body_about_content_file_three">
            <GetAppOutlinedIcon className="sideBar_setting_body_about_content_file_three_icon" />
            <MoreHorizOutlinedIcon className="sideBar_setting_body_about_content_file_three_icon" />
          </div>
        </div>
      </LayoutBodyItem>
    </div>
  );
};

export default React.memo(Body);
