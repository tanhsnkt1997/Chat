import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import groupAction from "../../../../redux/action/group";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import RoomItem from "../../chat/body/roomItem.jsx";

const GroupRoomList = () => {
  const listRoomChatData = useSelector((state) => state.group.listOnlyGroup.data);
  console.log("listRoomChatData", listRoomChatData);
  const listRoomChatTotal = useSelector((state) => state.group.listOnlyGroup.total);

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
    dispatch(groupAction.getListGroup({ limit: 15, page: pageRef.current }));
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

export default React.memo(GroupRoomList);
