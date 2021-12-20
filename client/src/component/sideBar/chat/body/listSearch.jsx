import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import roomAtion from "../../../../redux/action/room";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import RoomItem from "./roomItem.jsx";
import NoData from "../../base/noData.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

const RoomListSearch = ({ query }) => {
  const listRoomData = useSelector((state) => state.room.listRoomSearch.data);
  const listRoomTotalCount = useSelector((state) => state.room.listRoomSearch.total);
  const isLoading = useSelector((state) => state.room.listRoomSearch.loading);
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
      <RoomItem item={listRoomData[index]} />
    </div>
  );

  //first load
  useEffect(() => {
    if (query) {
      pageRef.current = 1;
      dispatch(roomAtion.getListRoomSearch({ query, limit: 15, page: 1 }));
    }
  }, [dispatch, query]);

  const fetchMoreData = () => {
    if (listRoomData.length >= 15) {
      pageRef.current = ++pageRef.current;
      dispatch(roomAtion.getListRoomSearchMore({ query, limit: 15, page: pageRef.current }));
    }
  };

  useEffect(() => {
    if (listRoomData.length >= listRoomTotalCount) {
      setHasMore(false);
    }
  }, [listRoomData.length]);

  // if (isLoading) {
  //   return <CircularProgress color="secondary" size={20} />;
  // }

  if (!listRoomData.length && query && !isLoading) {
    return <NoData />;
  }

  return (
    <BetterInfiniteScroll
      dataLength={listRoomData.length}
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
      children={listRoomData}
    />
  );
};

export default React.memo(RoomListSearch);
