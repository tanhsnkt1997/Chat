import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import roomAtion from "../../../../redux/action/room";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import RoomItem from "./roomItem.jsx";

const RoomList = () => {
  const listRoomChatData = useSelector((state) => state.room.listRoom.data);
  console.log("listRoomChatDatalistRoomChatData", listRoomChatData);
  const listRoomChatTotal = useSelector((state) => state.room.listRoom.total);
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
      <RoomItem item={listRoomChatData[index]} />
    </div>
  );

  const fetchMoreData = () => {
    pageRef.current = ++pageRef.current;
    dispatch(roomAtion.getListRoomChat({ limit: 15, page: pageRef.current }));
  };

  useEffect(() => {
    if (listRoomChatData.length >= listRoomChatTotal) {
      setHasMore(false);
    }
  }, [listRoomChatData.length]);

  return (
    <BetterInfiniteScroll
      dataLength={listRoomChatData.length}
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
      children={listRoomChatData}
    />
  );
};

export default React.memo(RoomList);
