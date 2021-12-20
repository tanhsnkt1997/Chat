import React, { useEffect, useState, useRef, useCallback } from "react";
import MessageItem from "./messageItem";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";
import {
  Table,
  Column,
  AutoSizer,
  InfiniteLoader,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import Scrollbar from "react-scrollbars-custom";

/** CellMeasurer component cache */
const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 80,
  minHeight: 30,
  fixedWidth: true,
  // keyMapper: () => 1,
});

let _maxHeight = 0;
let _listHeight = 0;

const defaultProps = {
  infiniteLoadingPercent: 0.2, //is threshold
  count: 20,
  isScroll: true,
  testAutoScroll: true,
  before: 0,
  after: 0,
};

const Elem = ({ i, style, registerChild }) => {
  return (
    <div
      ref={registerChild}
      style={{
        ...style,
        backgroundColor: "#fff",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "60px",
        padding: "50px",
        // margin: "10px",
      }}
    >
      div-#{i}
    </div>
  );
};

const MessageList = ({ ListMessageGroup, UserId, loadMore, roomId }, listProps) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [scrollToIndex, setScrollToIndex] = useState(undefined);
  const listRef = useRef(null);

  const listData = Object.entries(ListMessageGroup);
  const count = listData.reduce((acc, curr) => {
    acc = acc + curr[1].length;
    return acc;
  }, 0);

  const debounce = useCallback(
    _.debounce((maxHeight) => {
      setMaxHeight(maxHeight);
    }, 100),
    []
  );

  useEffect(() => {
    if (listRef.current && count >= 20) {
      listRef.current.scrollToRow(20);
    }
  }, [count]);

  //scroll first bottom load
  useEffect(() => {
    _maxHeight = 0;
    _listHeight = 0;
    setMaxHeight(0);
  }, [roomId]);

  const rowRenderer = ({ index, key, style, parent }) => {
    if (style.top + style.height > _maxHeight) {
      _maxHeight = style.top + style.height;
      debounce(_maxHeight);
    }
    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          <Elem key={key} i={index} style={style} registerChild={registerChild} />
        )}
      </CellMeasurer>
    );
  };

  const _onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (!clientHeight || !scrollHeight) return;
    if (scrollHeight < clientHeight) return;
    // console.log("vao onscroll", clientHeight, scrollHeight, scrollTop);
    if (
      clientHeight &&
      scrollHeight &&
      defaultProps.isScroll &&
      defaultProps.testAutoScroll &&
      count >= defaultProps.count &&
      scrollHeight - clientHeight > scrollTop
    ) {
      console.log("vao set auto scroll");
      // setAutoScroll(false);
      defaultProps.testAutoScroll = false;
    }
    if (
      scrollTop < defaultProps.infiniteLoadingPercent &&
      count >= defaultProps.count &&
      !defaultProps.testAutoScroll
    ) {
      defaultProps.before = scrollHeight - clientHeight;
      loadMore();
      cellMeasurerCache.clearAll();
      // alert("vao loadmore");
    }
  };

  console.log("COMPONENT DANG RENDERRRRRRRRRRRR");

  const onRowsRendered = () => {
    // listRef.current.scrollToRow(20);
    console.log("row RENDEREDDDDDDDDDDDDD");
    // setMaxHeight(_maxHeight);
    // listRef.current.scrollToItem({
    //   rowIndex: 18,
    // });
  };

  const renderList = ({ height, width, top }) => {
    console.log("before", defaultProps.testAutoScroll);
    if (_listHeight !== height) _listHeight = height;
    console.log("_listHeight", _listHeight);
    console.log("_maxHeight", _maxHeight);
    // console.log("autoscroll", autoScroll);
    return (
      <List
        ref={listRef}
        width={width}
        height={height}
        rowHeight={cellMeasurerCache.rowHeight}
        rowCount={count}
        rowRenderer={rowRenderer}
        scrollToIndex={19}
        // scrollTop={900}
        overscanRowCount={10}
        scrollToAlignment={"auto"}
        deferredMeasurementCache={cellMeasurerCache}
        onScroll={_onScroll}
        style={{
          paddingTop: `${_listHeight - _maxHeight > 0 ? _listHeight - _maxHeight : 0}px`,
          outline: "none",
        }}
        onRowsRendered={onRowsRendered}
        count={count}
      />
    );
  };

  return (
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
  );
};

export default React.memo(MessageList);

{
  /* <InfiniteScroll
        dataLength={count}
        next={loadMore}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={count >= 20 ? true : false}
        loader={<h4>Loading...</h4>}
        pullDownToRefresh={false}
        scrollableTarget={"chatShow___body_wrapper_scroll"}
        // scrollThreshold={"555px"}
        initialScrollY={0}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {Object.entries(ListMessageGroup)
          .reverse()
          .map((data, i) => (
            <div className="chatShow___body_messageList_wraper" key={i}>
              <div className="chatShow___body_messageList_chat_day">
                <span className="chatShow___body_messageList_chat_day_title">{data[0]}</span>
              </div>
              {data[1].map((item, index) => (
                <MessageItem item={item} UserId={UserId} key={index} />
              ))}
            </div>
          ))}
      </InfiniteScroll> */
}

// const renderListWithScrollbar = ({ height, width, top }) => (
//   <>
//     <Scrollbar
//       style={{ height, width }}
//       createContext={true}
//       noScrollX={true}
//       // onScroll={this.onScroll}
//       // ref={this.setScrollbarRef}
//       // scrollTop={scrollTop}
//       ref={scrollRef}
//     >
//       {renderList({ height, width, top })}
//     </Scrollbar>
//   </>
// );
