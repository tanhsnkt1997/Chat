import React from "react";
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

const MessageItem = ({ item, UserId, searchSelected }) => {
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
      return <ThumbUpAltIcon className="chatShow___body_show_like_item_reply" />;
    } else if (itemMess.messageType === "file" || itemMess.messageType === "text-file") {
      let data = itemMess.file.map((item, index) => {
        if (item.resource_type === "image") {
          return <img key={index} className="chatShow___body_show_img" src={item.thumb} alt="img" />;
        }
        if (item.resource_type === "video") {
          if (!item.thumb) {
            return (
              <audio key={index} controls>
                <source src={item.url} />
              </audio>
            );
          }
          return <VideoComponent key={index} item={item} />;
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
              className={`chatShow___body_me_tool_message chatShow___body_show_text_file `}
              // style={{ background: searchSelected === item._id && "red" }}
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
          className={`chatShow___body_me_tool_message`}
          // style={{ background: searchSelected === item._id && "red" }}
        >
          {renderMessageLink(itemMess?.link)}
          {itemMess.text}
        </div>
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ justifyContent: "center" }}>
        <div className={`chatShow___body_me_tool  `}>
          <div className={`chatShow___body_me_tool_wraper`} style={{ position: "relative" }}>
            <div className={`chatShow___body_me_tool_message_box `} style={{ background: "#1c9dea" }}>
              {/* content */}
              {checkShowItem(item)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
