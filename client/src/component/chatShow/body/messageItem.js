import React, { useState } from "react";
import moment from "moment";
import FileSaver from "file-saver";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import VideoComponent from "./video";

import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AllReaction from "./allReaction.jsx";
import MoreAction from "./moreAction/moreAction.jsx";
import Reply from "./reply/reply.jsx";

import imageRemoveUser from "../../../public/image/userRemove.png";
import Reaction from "./Reaction/reaction.jsx";
import { niceBytes } from "../../../helper/index";
import MessageItemReply from "./messageItemReply.jsx";

const MessageItem = ({ item, UserId, searchSelected, setOpenModalPlayer, setActiveObject }) => {
  const [openToolAction, setOpenToolAction] = useState(false);
  const isMe = () => {
    if (item.messageType === "notification") {
      return "notification";
    } else if (UserId === item.user._id) {
      return false; //dang bi lon nguoc
    } else {
      return true;
    }
  };

  const renderMessageLink = (links) => {
    if (links.length) {
      return (
        <div className="chatShow___body_link_container">
          {links.map((link, index) => (
            // eslint-disable-next-line react/jsx-no-target-blank
            <a href={link.url} target="_blank" key={index} style={{ textDecoration: "none" }}>
              <h4 className="chatShow___body_link_title">{link.title}</h4>
              <img src={link.image} alt="" className="chatShow___body_link_image" />
              <p className="chatShow___body_link_description">{link.description}</p>
            </a>
          ))}
        </div>
      );
    }
  };

  const checkShowItem = (itemMess) => {
    if (itemMess.messageType === "like") {
      return <ThumbUpAltIcon className="chatShow___body_show_like_item" />;
    } else if (itemMess.messageType === "file" || itemMess.messageType === "text-file") {
      let data = itemMess.file.map((item, index) => {
        if (item.resource_type === "image") {
          return (
            <img
              key={index}
              className="chatShow___body_show_img"
              src={item.thumb}
              alt="img"
              onClick={() => setActiveObject({ item, chatRoomId: itemMess.chatRoom, messageId: itemMess._id })}
            />
          );
        }
        if (item.resource_type === "video") {
          if (!item.thumb) {
            return (
              <audio key={index} controls>
                <source src={item.url} />
              </audio>
            );
          }
          return (
            <div
              key={index}
              onClick={() => setActiveObject({ item, chatRoomId: itemMess.chatRoom, messageId: itemMess._id })}
            >
              <VideoComponent item={item} />
            </div>
          );
        }

        return (
          <div key={index} className="chatShow___body_show_other_file_wraper">
            <div className="chatShow___body_show_other_file_head">
              <DescriptionOutlinedIcon className="chatShow___body_show_other_file_head_icon" />
            </div>

            <div className="chatShow___body_show_other_file_body">
              <div className="chatShow___body_show_other_file_body_text_first">{item.fileName}</div>
              <div className="chatShow___body_show_other_file_body_text_second">{niceBytes(item.fileSize)}</div>
            </div>
            <div className="chatShow___body_show_other_file_footer">
              <GetAppOutlinedIcon
                className="chatShow___body_show_other_file_footer_icon"
                onClick={() => {
                  FileSaver.saveAs(item.url, item.fileName);
                }}
              />
              <MoreHorizOutlinedIcon className="chatShow___body_show_other_file_footer_icon" />
            </div>
          </div>
        );
      });
      return (
        <>
          {itemMess.messageType === "text-file" && (
            <div
              className={`chatShow___body_me_tool_message chatShow___body_show_text_file ${
                !isMe() && "chatShow___body_you_tool_message"
              }`}
              style={{ background: searchSelected === item._id && "red" }}
            >
              {itemMess.text}
            </div>
          )}
          <div className="chatShow___body_show_img_wraper">{data}</div>
        </>
      );
    } else {
      //message text
      return (
        <div
          className={`chatShow___body_me_tool_message ${!isMe() && "chatShow___body_you_tool_message"}`}
          style={{ background: searchSelected === item._id && "red" }}
        >
          {renderMessageLink(itemMess?.link)}
          {itemMess.text}
        </div>
      );
    }
  };

  if (isMe() === "notification") {
    return (
      <div className="chatShow___body_notif_wraper">
        <div className="chatShow___body_notif_text">
          <p>{item.text}</p>
        </div>
      </div>
    );
  }

  const handleClickMessage = () => {
    // setOpenModalPlayer
    if (["file", "text-file"].includes(item.messageType)) {
      setOpenModalPlayer(true);
    }
  };

  return (
    <div
      className={`chatShow___body_me ${!isMe() && "chatShow___body_you"}`}
      onMouseEnter={() => {
        setOpenToolAction(true);
      }}
      onMouseLeave={() => setOpenToolAction(false)}
      onClick={handleClickMessage}
    >
      <div
        className={`chatShow___body_me_wraper ${!isMe() && "chatShow___body_you_wraper"}`}
        // style={{ background: "blue" }}
      >
        {/* avatar */}
        {!item.sameUser ? (
          <div className="chatShow___body_me_avatar_box">
            <img
              className="chatShow___body_me_avatar"
              src={item.isDelete ? imageRemoveUser : item.user.avatar}
              alt="chatShow-avatar"
            />
          </div>
        ) : (
          // div hide
          <div style={{ width: "50px" }} />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // background: "red",
            alignItems: "center",
          }}
        >
          {item.parentReply && <MessageItemReply item={item.parentReply} UserId={UserId} />}

          <div
            className={`chatShow___body_me_tool  ${!isMe() && "chatShow___body_you_tool"}`}
            style={{ transform: item.parentReply ? "translateY(-6px)" : "none" }}
          >
            <div
              className={`chatShow___body_me_tool_wraper ${!isMe() && "chatShow___body_you_tool_wraper"}  `}
              style={{ position: "relative" }}
            >
              <div
                className={`chatShow___body_me_tool_message_box ${!isMe() && "chatShow___body_you_tool_message_box"} `}
                // style={{ background: "pink" }}
              >
                {/* content */}
                {checkShowItem(item)}
                {/* <div className={`chatShow___body_me_tool_message ${!isMe() && "chatShow___body_you_tool_message"}`}>{item.text}</div> */}
                {/*  */}
                <div className={`chatShow___body_me_tool_time  ${!isMe() && "chatShow___body_you_tool_time"}`}>
                  <QueryBuilderIcon
                    className={`chatShow___body_me_tool_time_icon  ${!isMe() && "chatShow___body_you_tool_time_icon"}`}
                  />
                  <span
                    className={`chatShow___body_me_tool_time_detail ${
                      !isMe() && "chatShow___body_you_tool_time_detail"
                    }`}
                  >
                    {moment(item.createdAt).fromNow()}
                  </span>
                </div>
                {/* me or you */}
                <div
                  className={`${
                    !isMe() ? "chatShow___body_me_tool_arround_you" : "chatShow___body_me_tool_arround_me"
                  }`}
                />
              </div>
              {/*  */}
              <div
                style={{ position: "absolute", right: !isMe() ? "100%" : "initial", left: isMe() ? "100%" : "initial" }}
              >
                {!item.isDelete && openToolAction && (
                  <>
                    <MoreAction
                      messageId={item._id}
                      message={item.text}
                      files={item.file}
                      messageType={item.messageType}
                    />
                    {/* <SentimentSatisfiedOutlinedIcon className="chatShow___body_me_tool_message_icon" /> */}
                    <Reaction messageId={item._id} reactions={item.reaction} />
                    <Reply item={item} />
                  </>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "-5px", right: "10px" }}>
                <AllReaction reactions={item.reaction} />
              </div>
            </div>

            {/* display name */}
            {!item.sameUser && (
              <span className={`chatShow___body_me_tool_username ${!isMe() && "chatShow___body_you_tool_username"}`}>
                {item.isDelete ? "Người dùng app" : item.user.displayName}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
