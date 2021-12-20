import React from "react";
import { useDispatch } from "react-redux";
import socketAction from "../../../../../redux/action/socket";

const Remove = ({ messageId }) => {
  const dispatch = useDispatch();
  const handeRemove = () => {
    dispatch(socketAction.removeMessageAction({ messageId }));
  };

  return (
    <div className="chatShow__messageItem_moreAction_title" onClick={handeRemove}>
      Xóa, gỡ bỏ
    </div>
  );
};

export default React.memo(Remove);
