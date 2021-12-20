import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import roomAtion from "../../../../../redux/action/room";
import BetterInfiniteScroll from "../../../../base/betterInfiniteScroll.jsx";
import ForwardtItem from "./forwardItem.jsx";
import NoData from "../../../../base/noData.jsx";
// import CircularProgress from "@material-ui/core/CircularProgress";

const ContactListSearch = ({ message, messageType, files, query, listContactId, setListContactId, userId }) => {
  const listRoomForwardData = useSelector((state) => state.room.listRoomSearchForward.data);
  const listRoomForwardTotalCount = useSelector((state) => state.room.listRoomSearchForward.total);
  //   const isLoading = useSelector((state) => state.contact.listFriendSearch.loading);
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
      <ForwardtItem
        item={listRoomForwardData[index]}
        listContactId={listContactId}
        setListContactId={setListContactId}
        userId={userId}
        message={message}
        messageType={messageType}
        files={files}
      />
    </div>
  );

  //first load
  useEffect(() => {
    if (query) {
      pageRef.current = 1;
      dispatch(roomAtion.getListRoomSearch({ type: "forward", query, limit: 15, page: 1 }));
    }
  }, [dispatch, query]);

  const fetchMoreData = () => {
    if (listRoomForwardData.length >= 15) {
      pageRef.current = ++pageRef.current;
      dispatch(roomAtion.getListRoomSearch({ type: "forward", query, limit: 15, page: pageRef.current }));
    }
  };

  useEffect(() => {
    if (listRoomForwardData.length >= listRoomForwardTotalCount) {
      setHasMore(false);
    }
  }, [listRoomForwardData.length]);

  // if (isLoading) {
  //   return <CircularProgress color="secondary" size={20} />;
  // }

  if (!listRoomForwardData.length && query) {
    return <NoData />;
  }

  return (
    <BetterInfiniteScroll
      dataLength={listRoomForwardData.length}
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
      children={listRoomForwardData}
    />
  );
};

export default React.memo(ContactListSearch);
