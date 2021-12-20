import React, { useEffect, useState, useRef, useCallback } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import MessageItem from "./messageItem";
import messageAction from "../../../redux/action/message";
import { Table, Column, AutoSizer, InfiniteLoader, List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import Player from "../../base/player/player.jsx";

/** CellMeasurer component cache */
const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 0,
  minHeight: 77,
  fixedWidth: true,
  fixedHeight: false,
  // keyMapper: () => 1,
});

let _maxHeight = 0;
let _listHeight = 0;

const defaultProps = {
  infiniteLoadingPercent: 0.2, //is threshold
  count: 20,
  isAutoScroll: true,
  isLoadMore: false,
};

const MessageList = ({ searchSelected, ListMessageGroup, UserId, loadMore, roomId }) => {
  const dispatch = useDispatch();
  const [openModalPlayer, setOpenModalPlayer] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const listRef = useRef(null);
  let count = ListMessageGroup.length;

  //check selected indexOf list message
  useEffect(() => {
    if (searchSelected) {
      let index = ListMessageGroup.findIndex((message) => message._id === searchSelected);
      if (index !== -1) {
        listRef.current && listRef.current.scrollToRow(index);
      } else {
        // cellMeasurerCache.clearAll(); //check
        dispatch(
          messageAction.findListMessageSearch({ messageId: searchSelected, roomId, type: "default", limit: 20 })
        );
      }
    } else {
      // cellMeasurerCache.clearAll(); //check
    }
  }, [searchSelected]); // chu y dk

  const debounce = useCallback(
    _.debounce((maxHeight) => {
      setMaxHeight(maxHeight);
    }, 100),
    []
  );

  const callApiDebouce = useCallback(
    _.debounce(() => {
      // Force CellMeasurerCache to recalcul the previous index
      // caculateAllRowheight();
      defaultProps.isLoadMore = true;
      loadMore();
    }, 100),
    [roomId]
  );

  const scrollToRowTimeOut = (row) => {
    listRef.current && listRef.current.scrollToRow(row);
    setTimeout(() => {
      listRef.current && listRef.current.scrollToRow(row);
    }, 0);
  };

  const caculateAllRowheight = () => {
    cellMeasurerCache.clearAll(); //caculte all row
    listRef.current.recomputeRowHeights();
  };

  //scroll qua 24 khi co tin nhan moi giat ve 24
  useEffect(() => {
    if (searchSelected) {
      let index = ListMessageGroup.findIndex((message) => message._id === searchSelected);
      if (index !== -1) {
        caculateAllRowheight();
        setTimeout(() => {
          listRef.current && listRef.current.scrollToRow(index);
        }, 200);
      }
    } else {
      if (listRef.current && count >= 20 && !defaultProps.isAutoScroll && !defaultProps.isLoadMore) {
        console.log("co tin nhan moi ne !!");
      } else if (listRef.current && count >= 20 && !defaultProps.isAutoScroll && defaultProps.isLoadMore) {
        caculateAllRowheight();
        defaultProps.isLoadMore = false;
        scrollToRowTimeOut(24);
      } else if (count > 0 && defaultProps.isAutoScroll) {
        //first load
        scrollToRowTimeOut(count);
      }
    }
  }, [count]);

  //scroll first bottom load
  useEffect(() => {
    _maxHeight = 0;
    _listHeight = 0;
    defaultProps.isAutoScroll = true;
    setMaxHeight(0);
    caculateAllRowheight();
  }, [roomId]);

  const Elem = ({ i, style, registerChild }) => {
    const messageIndex = ListMessageGroup[i];
    return (
      <div
        ref={registerChild}
        style={{
          ...style,
        }}
      >
        {/* show date today, yesterday, dd/mm/yyyy */}
        {messageIndex.messageType === "date" ? (
          <div className="chatShow___body_messageList_chat_day">
            <span className="chatShow___body_messageList_chat_day_title">{messageIndex.text}</span>
          </div>
        ) : (
          <MessageItem
            item={messageIndex}
            UserId={UserId}
            searchSelected={searchSelected}
            setOpenModalPlayer={setOpenModalPlayer}
            setActiveObject={setActiveObject}
          />
        )}
      </div>
    );
  };

  const rowRenderer = ({ index, key, style, parent }) => {
    if (style.top + style.height > _maxHeight) {
      _maxHeight = style.top + style.height;
      debounce(_maxHeight);
    }

    return (
      <CellMeasurer cache={cellMeasurerCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ measure, registerChild }) => <Elem key={key} i={index} style={style} registerChild={registerChild} />}
      </CellMeasurer>
    );
  };

  const _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (!clientHeight || !scrollHeight) return;
    if (scrollHeight < clientHeight) return;
    const isScrolled = scrollHeight - scrollTop - clientHeight > 30;
    if (clientHeight && !defaultProps.isAutoScroll && !isScrolled && count >= defaultProps.count) {
      // enable autoScroll due to last displayed === last received
      defaultProps.isAutoScroll = true;
    }
    //scrolling
    if (
      clientHeight &&
      scrollHeight &&
      isScrolled &&
      defaultProps.isAutoScroll &&
      count >= defaultProps.count &&
      scrollHeight - clientHeight > scrollTop
    ) {
      // disable autoScroll because the user is reading an old message
      defaultProps.isAutoScroll = false;
    }
    if (scrollTop < defaultProps.infiniteLoadingPercent && count >= defaultProps.count && !defaultProps.isAutoScroll) {
      //load more
      callApiDebouce();
    }
  };

  const renderList = ({ height, width }) => {
    if (_listHeight !== height) _listHeight = height;
    return (
      <div style={{ position: "relative" }}>
        {/* <div style={{ position: "absolute", zIndex: 1 }} onClick={() => alert("ok")}>
          ban co 1 tin nhan moi
        </div> */}
        <List
          ref={listRef}
          width={width}
          height={height}
          rowHeight={cellMeasurerCache.rowHeight}
          rowCount={count}
          rowRenderer={rowRenderer}
          // scrollToIndex={defaultProps.isAutoScroll ? count : undefined}
          // scrollTop={900}
          // estimatedRowSize={50}
          // onRowsRendered
          overscanRowCount={10}
          scrollToAlignment={"auto"}
          deferredMeasurementCache={cellMeasurerCache}
          onScroll={_onScroll}
          style={{
            paddingTop: `${_listHeight - _maxHeight > 0 ? _listHeight - _maxHeight : 0}px`,
            outline: "none",
          }}
        />
      </div>
    );
  };

  return (
    <>
      <div
        id="chatShow___body_wrapper_scroll"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <AutoSizer>{({ height, width }) => renderList({ height, width })}</AutoSizer>
      </div>
      {openModalPlayer && (
        <Player openModalPlayer={openModalPlayer} setOpenModalPlayer={setOpenModalPlayer} activeObject={activeObject} />
      )}
    </>
  );
};

export default React.memo(MessageList);

//some bug
// listRef.current.scrollToRow(22);
// setTimeout(() => {
//   listRef.current.scrollToRow(22);
// }, 0);
// alert("ok");
