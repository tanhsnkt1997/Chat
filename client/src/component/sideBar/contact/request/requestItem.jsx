import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../redux/action/socket";

const RequestItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleAcceptFriend = (item) => {
    dispatch(socketAction.reqAcceptFriend(item));
  };

  const handleRejectFriend = (id) => {
    dispatch(socketAction.reqRejectFriend({ id }));
  };

  return (
    <div className="sideBar__request_item_container">
      <div className="sideBar__request_item_left">
        <img
          className="sideBar__request_item_left_avatar"
          alt="req_avatar"
          src={item.contactAvatar}
        />
      </div>
      <div className="sideBar__request_item_right">
        <div className="sideBar__request_item_right_name">{item.contactName}</div>
        <div className="sideBar__request_item_right_btn_wraper">
          <Button
            variant="contained"
            color="primary"
            className="sideBar__request_item_right_btn_accept"
            onClick={() => handleAcceptFriend(item)}
          >
            Xác nhận
          </Button>
          <Button
            variant="contained"
            className="sideBar__request_item_right_btn_close"
            onClick={() => handleRejectFriend(item._id)}
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RequestItem);
