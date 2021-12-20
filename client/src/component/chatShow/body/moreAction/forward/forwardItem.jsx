import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import socketAction from "../../../../../redux/action/socket";

const ForwardItem = ({ message, messageType, files, item, listContactId, setListContactId, userId }) => {
  const dispatch = useDispatch();

  //check
  const isSend = listContactId.indexOf(item._id) !== -1;

  const filterListLinkFile = () => {
    const links = files.map((file) => {
      return {
        fileName: file.fileName,
        path: file.url,
        mimetype: file.mimetype,
        public_id: file.public_id,
      };
    });
    return links;
  };

  const handleForward = () => {
    if (!isSend) {
      setListContactId(item._id);
      if (messageType === "text" || messageType === "link") {
        dispatch(
          socketAction.sentMessge({
            text: message,
            chatRoomId: item._id,
          })
        );
      } else {
        //is file, img....
        dispatch(
          socketAction.sentMessageFileForward({
            text: message,
            files: filterListLinkFile(),
            chatRoomId: item._id,
            type: "forward", //check condition remove local file after upload cloudbinary
          })
        );
      }
    }
  };

  return (
    <li className="modalAdd__forward_item_wraper">
      <div className="modalAdd__forward_item_header" style={{ backgroundImage: `url(${item.chatIcon})` }}></div>
      <div className="modalAdd__forward_item_body">
        <span>{item.name}</span>
      </div>
      <div className="modalAdd__forward_item_body_footer">
        <Button
          type="submit"
          variant="contained"
          className="modalAdd__footer_btn_add_user"
          onClick={handleForward}
          disabled={isSend ? true : false}
        >
          {isSend ? "Đã gửi" : "Gửi"}
        </Button>
      </div>
    </li>
  );
};

export default React.memo(ForwardItem);
