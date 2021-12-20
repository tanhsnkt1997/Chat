import React from "react";
import moment from "moment";
import "./Body.css";
import { useDispatch } from "react-redux";
import roomAction from "../../../../redux/action/room";
import messageAction from "../../../../redux/action/message";
import { useSelector } from "react-redux";

import DescriptionIcon from "@material-ui/icons/Description";

const RoomItem = ({ item }) => {
  const roomRef = React.useRef(null);
  const dispatch = useDispatch();
  const currenRoom = useSelector((state) => state.room.currentRoom);

  React.useEffect(() => {
    //tô màu room chat khi = room choose
    if (currenRoom?._id === item._id && roomRef.current) {
      return (roomRef.current.style.backgroundColor = "#e6ebf5");
    }
    return (roomRef.current.style.backgroundColor = "#f7f7ff");
  }, [currenRoom, item._id, roomRef]);

  //open chat message in chat show
  const handleClickItem = (e) => {
    // e.target.style.backgroundColor = "#e6ebf5";
    //fix click double to list messager
    if (currenRoom?._id !== item._id) {
      //if searching then change room
      dispatch(messageAction.resetSearch());
      dispatch(roomAction.setCurrentRoom(item));
    }
  };

  const renderLastMessageByType = (item) => {
    if (item.lastMessage.messageType === "file") {
      return (
        <div className="sideBar__body_item_last_mess_text_file_wraper">
          <DescriptionIcon />
          <span>file</span>
        </div>
      );
    } else if (item.lastMessage.messageType === "text-file") {
      return (
        <div className="sideBar__body_item_last_mess_text_file_wraper">
          <DescriptionIcon />
          <span>{item.lastMessage.text}</span>
        </div>
      );
    } else {
      return <span>{item.lastMessage.text}</span>;
    }
  };

  const renderUnreadMessage = (total) => {
    if (total > 5) {
      return "5+";
    } else if (total > 50) {
      return "N";
    } else {
      return total;
    }
  };

  return (
    <li ref={roomRef} className="sideBar__body_item_wraper" onClick={handleClickItem}>
      <div className="sideBar__body_item_first">
        <img className="sideBar__body_item_img" src={item.chatIcon} alt="img_sideBar_body"></img>
        <div className="sideBar__body_item_content">
          <span className="sideBar__body_item_content_left">{item.name}</span>
          <span className="sideBar__body_item_content_right">{item.lastMessage && renderLastMessageByType(item)}</span>
        </div>
      </div>
      <div className="sideBar__body_item_second">
        <span className="sideBar__body_item_second_first">{moment(item.lastMessage?.updatedAt).fromNow()}</span>
        {item.unreadMessage > 0 && (
          <div className="sideBar__body_item_second_second">{renderUnreadMessage(item.unreadMessage)}</div>
        )}
      </div>
    </li>
  );
};

export default React.memo(RoomItem);
