import React from "react";
import { useSelector } from "react-redux";
import FriendList from "./friendList.jsx";
import FriendListSearch from "./listSearch.jsx";

import "./Friend.css";

const Friend = () => {
  const query = useSelector((state) => state.contact.query);

  const isQuery = () => {
    if (query) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="sideBar__request_container">
      {isQuery() && (
        <div className="sideBar__request_wraper" style={{ display: isQuery() ? "block" : "none" }}>
          <FriendListSearch query={query} />
        </div>
      )}
      <div className="sideBar__request_wraper" style={{ display: !isQuery() ? "block" : "none" }}>
        <FriendList />
        {/* {listFriend.map((item, index) => (
          <FriendItem item={item} key={index} />
        ))} */}
      </div>
    </div>
  );
};

export default React.memo(Friend);
