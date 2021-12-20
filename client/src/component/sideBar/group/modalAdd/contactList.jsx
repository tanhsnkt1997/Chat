import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import contactAction from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import ContactItem from "./contactItem.jsx";

const ContactList = ({ listContactId, setListContactId, userId }) => {
  const listFriendData = useSelector((state) => state.contact.listFriend.data);
  const listFriendCount = useSelector((state) => state.contact.listFriend.total);

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
      <ContactItem
        item={listFriendData[index]}
        listContactId={listContactId}
        setListContactId={setListContactId}
        userId={userId}
      />
    </div>
  );

  const fetchMoreData = () => {
    pageRef.current = ++pageRef.current;
    dispatch(contactAction.getListContact({ limit: 15, page: pageRef.current }));
    // dispatch(roomAtion.getListRoomChat({ limit: 15, page: pageRef.current }));
  };

  useEffect(() => {
    if (listFriendData.length >= listFriendCount) {
      setHasMore(false);
    }
  }, [listFriendData.length]);

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

export default React.memo(ContactList);
