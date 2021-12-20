import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import contactAtion from "../../../../redux/action/contact";
import BetterInfiniteScroll from "../../betterInfiniteScroll.js";
import ContactItem from "./contactItem.jsx";
import NoData from "../../base/noData.jsx";
// import CircularProgress from "@material-ui/core/CircularProgress";

const ContactListSearch = ({ query, listContactId, setListContactId, userId }) => {
  const listContactData = useSelector((state) => state.contact.listFriendSearch.data);
  const listContactTotalCount = useSelector((state) => state.contact.listFriendSearch.total);
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
      <ContactItem
        item={listContactData[index]}
        listContactId={listContactId}
        setListContactId={setListContactId}
        userId={userId}
      />
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
    if (listContactData.length >= 15) {
      pageRef.current = ++pageRef.current;
      dispatch(contactAtion.getListFriendSearchMore({ query, limit: 15, page: pageRef.current }));
    }
  };

  useEffect(() => {
    if (listContactData.length >= listContactTotalCount) {
      setHasMore(false);
    }
  }, [listContactData.length]);

  // if (isLoading) {
  //   return <CircularProgress color="secondary" size={20} />;
  // }

  if (!listContactData.length && query && !isLoading) {
    return <NoData />;
  }

  return (
    <BetterInfiniteScroll
      dataLength={listContactData.length}
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
      children={listContactData}
    />
  );
};

export default React.memo(ContactListSearch);
