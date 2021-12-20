import React, { useState, useEffect, useRef } from "react";
import { AutoSizer, List, InfiniteLoader } from "react-virtualized";
import { useSelector, useDispatch } from "react-redux";
import contactAction from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import RequestItem from "./requestItem.jsx";

const RequestList = () => {
  const listReqData = useSelector((state) => state.contact.listReq.data);
  const listReqTotal = useSelector((state) => state.contact.listReq.total);

  const pageRef = useRef(0);
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = useState(true);
  const rowRenderer = ({ index, isScrolling, key, style }) => (
    <div
      key={key}
      style={{
        ...style,
      }}
    >
      <RequestItem item={listReqData[index]} />
    </div>
  );

  const fetchMoreData = () => {
    pageRef.current = ++pageRef.current;
    dispatch(contactAction.getListRequestContact({ limit: 15, page: pageRef.current }));
  };

  useEffect(() => {
    if (listReqData.length >= listReqTotal) {
      setHasMore(false);
    }
  }, [listReqData.length]);

  return (
    <BetterInfiniteScroll
      dataLength={listReqData.length}
      hasMore={hasMore}
      next={fetchMoreData}
      loader={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loading...
        </div>
      }
      elementHeight={77}
      rowRenderer={rowRenderer}
      children={listReqData}
    />
  );
};

export default React.memo(RequestList);
