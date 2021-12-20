import React, { useState, useEffect, useRef } from "react";
import { AutoSizer, List, InfiniteLoader } from "react-virtualized";
import { useSelector, useDispatch } from "react-redux";
import contactAtion from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import FriendItem from "./friendItem.jsx";
import NoData from "../../base/noData.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

const FriendListSearch = ({ query }) => {
  const listFriendData = useSelector((state) => state.contact.listFriendSearch.data);
  const listFriendTotalCount = useSelector((state) => state.contact.listFriendSearch.total);
  const isLoading = useSelector((state) => state.contact.listFriendSearch.loading);
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
      <FriendItem item={listFriendData[index]} />
    </div>
  );

  //first load
  useEffect(() => {
    if (query) {
      pageRef.current = 1;
      dispatch(contactAtion.getListFriendSearch({ query, limit: 15, page: 1 }));
    }
  }, [dispatch, query]);

  const fetchMoreData = () => {
    if (listFriendData.length >= 15) {
      pageRef.current = ++pageRef.current;
      dispatch(contactAtion.getListFriendSearchMore({ query, limit: 15, page: pageRef.current }));
    }
  };

  useEffect(() => {
    if (listFriendData.length >= listFriendTotalCount) {
      setHasMore(false);
    }
  }, [listFriendData.length]);

  // if (isLoading) {
  //   return <CircularProgress color="secondary" size={20} />;
  // }

  if (!listFriendData.length && query && !isLoading) {
    return <NoData />;
  }

  return (
    <BetterInfiniteScroll
      dataLength={listFriendData.length}
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
      children={listFriendData}
    />
  );
};

export default React.memo(FriendListSearch);
