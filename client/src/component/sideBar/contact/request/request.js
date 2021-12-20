import React, { useEffect } from "react";
import RequestItem from "./requestItem.jsx";
import RequestList from "./requestList.jsx";
import RequestListSearch from "./listSearch.jsx";

import contactAction from "../../../../redux/action/contact";
import { useDispatch, useSelector } from "react-redux";

import "./Request.css";

export default function Request() {
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
          <RequestListSearch query={query} />
        </div>
      )}
      <div className="sideBar__request_wraper" style={{ display: !isQuery() ? "block" : "none" }}>
        <RequestList />
      </div>
    </div>
  );
}
