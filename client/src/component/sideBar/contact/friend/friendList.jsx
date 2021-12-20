import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import contactAction from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import FriendItem from "./friendItem.jsx";

const FriendList = () => {
  const { listFriend } = useSelector((state) => state.contact);

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
      <FriendItem item={listFriend.data[index]} />
    </div>
  );

  const fetchMoreData = () => {
    pageRef.current = ++pageRef.current;
    dispatch(contactAction.getListContact({ limit: 15, page: pageRef.current }));
    // dispatch(roomAtion.getListRoomChat({ limit: 15, page: pageRef.current }));
  };

  useEffect(() => {
    if (listFriend.data.length >= listFriend.total) {
      setHasMore(false);
    }
  }, [listFriend.data.length]);

  return (
    <BetterInfiniteScroll
      dataLength={listFriend.data.length}
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
      children={listFriend.data}
    />
  );
};

export default React.memo(FriendList);
