import React, { useState } from "react";
import "./Body.css";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";

const Video = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="chatShow___body_show_img_thumb_video_wraper" onClick={() => setOpen(true)}>
      <img className="chatShow___body_show_img_thumb_video" src={item.thumb} alt="img-thumb" style={{ display: open ? "none" : "block" }} />
      <PlayCircleFilledWhiteOutlinedIcon className="chatShow___body_show_img_thumb_video_play_icon" style={{ display: open ? "none" : "block" }} />
      {open && (
        <video poster={item.thumb} controls width="100%" className="chatShow___body_show_video" autoPlay style={{ display: open ? "block" : "none" }}>
          <source src={item.url} />
        </video>
      )}
    </div>
  );
};

export default React.memo(Video);
