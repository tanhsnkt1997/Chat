import React from "react";
import ReplyIcon from "@material-ui/icons/Reply";
import { useDispatch } from "react-redux";
import messageAction from "../../../../redux/action/message";

const Reply = ({ item }) => {
  const { createdAt, file, link, messageType, text, user } = item;
  const dispatch = useDispatch();
  const handleReply = () => {
    dispatch(
      messageAction.messageReply({
        createdAt,
        file,
        link,
        messageType,
        text,
        user: { displayName: user.displayName },
      })
    );
  };
  return <ReplyIcon onClick={handleReply} className="chatShow___body_me_tool_message_icon" />;
};

export default React.memo(Reply);
