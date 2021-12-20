import React, { useEffect, useRef, useCallback, useState } from "react";
import "./Body.css";
import { createSelector } from "reselect";

import { useDispatch, useSelector } from "react-redux";
import messageAction from "../../../redux/action/message";
import socketAction from "../../../redux/action/socket";
import MessageList from "./messageList";
import { renderDay } from "../../../helper/index";

let pageTest = 0;

const selectListMessage = createSelector(
  (state) => state.message.listMessage,
  (_, date) => date,
  (listMessage, date) =>
    listMessage.reduce((acc, curr, index, array) => {
      if (
        array[index].messageType &&
        array[index].messageType !== "notification" &&
        array[index + 1] &&
        array[index + 1].messageType !== "notification" &&
        array[index].user._id === array[index + 1].user._id
      ) {
        curr.sameUser = true;
      }
      let currentSelectDay = renderDay(curr.createdAt);
      if (!date || (date && date !== currentSelectDay)) {
        acc.push({
          text: currentSelectDay,
          messageType: "date",
        });
        date = currentSelectDay;
      }
      acc.push(curr);

      //reset date if click open other room
      if (index === array.length - 1) {
        date = undefined;
      }

      return acc;
    }, [])
);

const Body = () => {
  const dispatch = useDispatch();

  const currentRoom = useSelector((state) => state.room.currentRoom);
  const UserId = useSelector((state) => state.auth.user._id);
  const searchSelected = useSelector((state) => state.message.searchSelected);
  const listMessageCustomDate = useSelector((state) => selectListMessage(state, undefined)); // undefined is default

  //join and get list chat message
  useEffect(() => {
    // setPage(0);
    if (!searchSelected) {
      pageTest = 0;
      dispatch(messageAction.clearMessage());
      dispatch(
        socketAction.joinRoom({ chatRoomId: currentRoom._id, userId: UserId, unreadMessage: currentRoom.unreadMessage })
      );
      dispatch(messageAction.getListMessage({ chatRoomId: currentRoom._id, limit: 20, page: 0 }));
    }
  }, [dispatch, currentRoom?._id, searchSelected]);

  const loadMore = () => {
    if (!searchSelected) {
      pageTest = ++pageTest;
      dispatch(messageAction.getListMessage({ chatRoomId: currentRoom._id, limit: 20, page: pageTest }));
    } else {
      messageAction.findListMessageSearch({
        messageId: listMessageCustomDate[0]._id,
        roomId: currentRoom,
        type: "prev",
        limit: 20,
      });
    }
  };

  return (
    <div className="chatShow___body_container">
      <div className="chatShow___body_wrapper">
        <MessageList
          ListMessageGroup={listMessageCustomDate}
          UserId={UserId}
          loadMore={loadMore}
          roomId={currentRoom._id}
          searchSelected={searchSelected}
        />
      </div>
    </div>
  );
};

export default React.memo(Body);

// const { currentRoom, listMessage, UserId } = useSelector(
//   (store) => ({
//     currentRoom: store.room.currentRoom,
//     listMessage: store.message.listMessage,
//     UserId: store.auth.user._id,
//   }),
//   shallowEqual
// );
