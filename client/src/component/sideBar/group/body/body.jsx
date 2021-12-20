import React from "react";
import "./Body.css";
import { useSelector } from "react-redux";
import GroupRoomList from "./groupRoomList.jsx";
import GroupListSearch from "./listSearch.jsx";

const Body = () => {
  const query = useSelector((state) => state.group.query);

  const isQuery = () => {
    if (query) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="sideBar__body_container">
      <div className="sideBar__body_wraper">
        <h2 className="sideBar__body_title">Recent</h2>
        {isQuery() && (
          <ul className="sideBar__body_list_ul">
            <GroupListSearch query={query} />
          </ul>
        )}
        <ul
          className="sideBar__body_list_wraper"
          style={{ display: !isQuery() ? "block" : "none" }}
        >
          <GroupRoomList />
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Body);
