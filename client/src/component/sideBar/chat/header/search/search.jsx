import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import roomAction from "../../../../../redux/action/room";
import { useSelector, shallowEqual } from "react-redux";

import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const queryStore = useSelector((state) => state.room.query);

  useEffect(() => {
    if (queryStore) {
      setQuery(queryStore);
    }
  }, []);

  const handleChange = (e) => {
    dispatch(roomAction.searchAllRoom({ text: e.target.value, page: 1, limit: 15 }));
    setQuery(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") alert("enter");
  };

  return (
    <div className="sideBar__body_header_search_container">
      <SearchIcon className="sideBar__body_header_search_icon" />
      <input
        placeholder="Search messages or users"
        type="text"
        className="sideBar__body_header_search_input"
        onChange={handleChange}
        value={query}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default React.memo(Search);
