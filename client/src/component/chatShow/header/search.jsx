import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "../../../helper/use-debounce";
import messageAction from "../../../redux/action/message";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const Search = ({ isSearch, setIsSearch }) => {
  const dispatch = useDispatch();
  const [text, setText, { signal, debouncing }] = useDebounce("");
  const currentRoomId = useSelector((state) => state.room.currentRoom?._id);
  const listResultSearch = useSelector((state) => state.message.listResultSearch);
  const indexChoose = useRef(0);

  useEffect(() => {
    if (listResultSearch.length) {
      indexChoose.current = listResultSearch.length - 1;
    }
  }, [listResultSearch.length]);

  useEffect(() => {
    if (text) {
      dispatch(messageAction.searchMessage({ chatRoomId: currentRoomId, page: 1, limit: 15, keyword: text }));
    }
  }, [signal]);

  useEffect(() => {
    indexChoose.current = 0;
  }, [currentRoomId]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const upResultSearch = () => {
    if (indexChoose.current !== -1) {
      if (indexChoose.current === listResultSearch.length - 1) {
        indexChoose.current = 0;
        dispatch(messageAction.setIndexSearchMessage(listResultSearch[0]._id));
      } else {
        ++indexChoose.current;
        dispatch(messageAction.setIndexSearchMessage(listResultSearch[indexChoose.current]._id));
      }
    }
  };

  const downResultSearch = () => {
    if (indexChoose.current !== -1) {
      if (indexChoose.current === 0) {
        indexChoose.current = listResultSearch.length - 1;
        dispatch(messageAction.setIndexSearchMessage(listResultSearch[listResultSearch.length - 1]._id));
      } else {
        --indexChoose.current;
        dispatch(messageAction.setIndexSearchMessage(listResultSearch[indexChoose.current]._id));
      }
    }
  };

  const handleClose = () => {
    setIsSearch((state) => !state);
    dispatch(messageAction.resetSearch());
    listResultSearch.length && dispatch(messageAction.clearMessage());
  };

  return (
    <>
      {isSearch && (
        <div className="chatShow___header_search">
          <div className="chatShow___header_search_wraper">
            <SearchIcon />
            <input type="text" onChange={handleChange} className="chatShow___header_search_input" />
            {listResultSearch.length > 0 && <span>{listResultSearch.length} kết quả</span>}
          </div>
          <div className="chatShow___header_search_tool_wraper">
            {listResultSearch.length > 0 && (
              <>
                <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={upResultSearch}>
                  <ExpandLessIcon />
                </span>
                <span style={{ cursor: "pointer", margin: "0px 10px" }} onClick={downResultSearch}>
                  <ExpandMoreIcon />
                </span>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              className="chatShow___header_search_tool_button"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Search);
