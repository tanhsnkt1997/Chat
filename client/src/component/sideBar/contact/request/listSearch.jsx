import React, { useState, useEffect, useRef } from "react";
import { AutoSizer, List, InfiniteLoader } from "react-virtualized";
import { useSelector, useDispatch } from "react-redux";
import contactAtion from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import RequestItem from "./requestItem";
import NoData from "../../base/noData.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

const FriendListSearch = ({ query }) => {
  const listReqData = useSelector((state) => state.contact.listReqSearch.data);
  const listReqTotalCount = useSelector((state) => state.contact.listReqSearch.total);
  const isLoading = useSelector((state) => state.contact.listReqSearch.loading);

  const pageRef = useRef(1);
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

  //first load
  useEffect(() => {
    if (query) {
      pageRef.current = 1;
      dispatch(contactAtion.getListReqFriendSearch({ query, limit: 15, page: 1 }));
    }
  }, [dispatch, query]);

  const fetchMoreData = () => {
    if (listReqData.length >= 15) {
      pageRef.current = ++pageRef.current;
      dispatch(
        contactAtion.getListReqFriendSearchMore({ query, limit: 15, page: pageRef.current })
      );
    }
  };

  useEffect(() => {
    if (listReqData.length >= listReqTotalCount) {
      setHasMore(false);
    }
  }, [listReqData.length]);

  // if (isLoading) {
  //   return <CircularProgress color="secondary" size={20} />;
  // }

  if (!listReqData.length && query && !isLoading) {
    return <NoData />;
  }

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

export default React.memo(FriendListSearch);
