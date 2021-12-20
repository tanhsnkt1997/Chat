import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../../helper/use-debounce";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ keyWordSearch }) => {
  const [text, setText, { signal, debouncing }] = useDebounce("");

  useEffect(() => {
    keyWordSearch(text);
  }, [signal]);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <div className="sideBar__body_header_search_container">
        <SearchIcon className="sideBar__body_header_search_icon" />
        <input
          onChange={handleChangeText}
          placeholder="Search..."
          type="text"
          className="sideBar__body_header_search_input"
        />
      </div>
    </>
  );
};

export default React.memo(Search);
