import React, { useRef, useState } from "react";
import "./Footer.css";
import { useSelector, useDispatch } from "react-redux";
import socketAction from "../../../redux/action/socket";

import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Emoji from "./emoji/emoji";
import Img from "./img/img";
import Reply from "./reply/reply.jsx";
import Input from "./input.jsx";
import Attachment from "./attachment/attachment.jsx";

const Footer = () => {
  const dispatch = useDispatch();
  const childRef = useRef();
  const inputRef = useRef(null);
  const currenRoomId = useSelector((state) => state.room.currentRoom._id);
  const messageReply = useSelector((state) => state.message.messageReply);
  const [files, setFile] = useState([]);
  const [isShowLikeButton, setShowLikeButton] = useState(true);
  console.log("isShowLikeButton", isShowLikeButton);

  const handleSentMessage = () => {
    // sent file
    if (files.length) {
      const file = new FormData();
      files.forEach((itemFile) => {
        file.append("file", itemFile);
      });
      file.append("chatRoomId", currenRoomId);
      dispatch(socketAction.sentMessageFile(file));
      setFile([]); //remove file
      inputRef.current.resetTextInput(); //remove text
      childRef.current.isOpenEmoji(); //close emoji
      return;
    }
    //sent only text, link
    dispatch(
      socketAction.sentMessge({
        text: inputRef.current.getTextInput(),
        chatRoomId: currenRoomId,
        type: "text",
        messageReply,
      })
    );
    inputRef.current.resetTextInput(); //remove text
    childRef.current.isOpenEmoji(); //close emoji
  };

  // like
  const handleLike = () => {
    dispatch(
      socketAction.sentMessageLike({
        chatRoomId: currenRoomId,
        type: "like",
      })
    );
  };

  const chooseImgs = (imgs) => {
    setFile(imgs);
  };

  const handleRemoveFiles = (file) => {
    setFile(files.filter((item) => item.name !== file.name));
    URL.revokeObjectURL(file);
  };

  const renderTypeFileSelect = (item) => {
    let mimeAudios = [
      "audio/basic",
      "auido/L24",
      "audio/mid",
      "audio/mpeg",
      "audio/mp4",
      "audio/x-aiff",
      "audio/x-aiff",
      "audio/x-mpegurl",
      "audio/vnd.wav",
    ];
    let mimeVideos = [
      "video/webm",
      "video/x-flv",
      "video/mp4",
      "application/x-mpegURL",
      "video/MP2T",
      "video/3gpp",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
    ];
    let mimeImgs = [
      "image/gif",
      "image/ief",
      "image/png",
      "image/webp",
      "image/jpeg",
      "image/pipeg",
      "image/svg+xml",
      "image/tiff",
      "image/x-icon",
      "image/x-rgb",
    ];
    //check mime type
    if (mimeVideos.includes(item.type)) {
      return (
        <div className="chatShow___footer_input_video_item_wraper">
          <video className="chatShow___footer_input_video_item">
            <source src={URL.createObjectURL(item)} />
          </video>
          <PlayCircleFilledWhiteOutlinedIcon className="chatShow___footer_input_video_item_icon" />
        </div>
      );
    }
    if (mimeImgs.includes(item.type)) {
      return <img src={URL.createObjectURL(item)} alt="img-sent" className="chatShow___footer_input_chat_image_item" />;
    }
    return (
      <div className="chatShow___footer_input_other_file_item_wraper">
        <div className="chatShow___footer_input_other_file_item_head">
          <DescriptionOutlinedIcon className="chatShow___footer_input_other_file_item_head_icon" />
        </div>

        <div className="chatShow___footer_input_other_file_item_body">
          <div className="chatShow___footer_input_other_file_item_body_text">{item.name}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="chatShow___footer_container">
      <div className="chatShow___footer_input_chat_wraper">
        {messageReply && <Reply messageReply={messageReply} />}
        <div className="chatShow___footer_input_chat_files">
          {files.map((file, index) => (
            <div key={index} className="chatShow___footer_input_chat_image_wraper">
              {renderTypeFileSelect(file)}
              <div className="chatShow___footer_input_chat_remove_item" onClick={() => handleRemoveFiles(file)}>
                <CloseIcon className="chatShow___footer_input_chat_remove_icon" />
              </div>
            </div>
          ))}
        </div>
        {/* <input id="message" ref={inputRef} className="chatShow___footer_input_text" placeholder="Enter Message ..." /> */}
        <Input ref={inputRef} setShowLikeButton={setShowLikeButton} />
      </div>

      <div className="chatShow___footer_toolbox_container">
        <Emoji ref={childRef} inputRef={inputRef} />
        <Attachment chooseImgs={chooseImgs} />
        <Img chooseImgs={chooseImgs} />
        {isShowLikeButton && !files.length ? (
          <div className="chatShow___footer_toolbox_send_wraper" onClick={handleLike}>
            <ThumbUpAltIcon className="chatShow___footer_toolbox_like" />
          </div>
        ) : (
          <div className="chatShow___footer_toolbox_send_wraper" onClick={handleSentMessage}>
            <SendOutlinedIcon className="chatShow___footer_toolbox_send" />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Footer);
