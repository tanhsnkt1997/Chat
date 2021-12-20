import React, { useEffect } from "react";
import socketAction from "../../../../redux/action/socket";
import { useDispatch, useSelector } from "react-redux";

const FriendItem = ({ item }) => {
  const dispatch = useDispatch();
  const friendItemRef = React.useRef(null);

  const currenRoom = useSelector((state) => state.room.currentRoom);
  const UserId = useSelector((state) => state.auth.user._id);

  // CAN XEM LAI
  useEffect(() => {
    if (currenRoom?.members && currenRoom?.chatType === "direct") {
      let friendId = item.contactId === UserId ? item.userId : item.contactId;
      let contactChoose = currenRoom.members.findIndex((member) => member._id === friendId);
      if (contactChoose !== -1) {
        return (friendItemRef.current.style.backgroundColor = "#e6ebf5");
      }
      return (friendItemRef.current.style.backgroundColor = "#f7f7ff");
    }
    return (friendItemRef.current.style.backgroundColor = "#f7f7ff");
  }, [item._id, currenRoom?.members, item, UserId]);

  const checkRoomChat = (item) => {
    dispatch(
      socketAction.creatRomChat({
        name: item._id,
        chatType: "direct",
        members: [item.userId, item.contactId],
      })
    );
  };
  return (
    <>
      <div ref={friendItemRef} className="sideBar__request_item_container" onClick={() => checkRoomChat(item)}>
        <div className="sideBar__request_item_left">
          <div className="sideBar__request_item_left_wraper" style={{ backgroundImage: `url(${item.contactAvatar})` }}>
            <div
              className="sideBar__request_item_left_status"
              style={{ background: item.isOnline ? "#44a675" : "red" }}
            />
            <div className="sideBar__request_item_left_status" />
          </div>
        </div>
        <div className="sideBar__request_frien_item_right">
          <div className="sideBar__request_item_right_name">{item.contactName}</div>
          <div className="sideBar__request_item_right_btn_wraper">chua lam ne !!</div>
        </div>
      </div>
    </>
  );
};

export default React.memo(FriendItem);
