import React, { useState } from "react";
import "./File.css";
import Base from "../base/base.jsx";
import ImageComponent from "./image/image.jsx";
import VideoAudio from "./videoAudio/videoAudio.jsx";
import Doc from "./doc/doc.jsx";

const Files = ({ setOpen, roomId }) => {
  const listComponent = [
    { type: "image", component: <ImageComponent roomId={roomId} /> },
    { type: "videoAudio", component: <VideoAudio roomId={roomId} /> },
    { type: "doc", component: <Doc roomId={roomId} /> },
  ];

  const [type, setType] = useState("image");
  return (
    <Base title="FILES" description="Shared Media" setOpen={setOpen}>
      <div className="rightBar_file_container">
        <div className="rightBar_file_header_wraper">
          <div className={`rightBar_file_header_item ${type === "image" && " rightBar_file_header_item_active"}`} onClick={() => setType("image")}>
            Image
          </div>
          <div className={`rightBar_file_header_item ${type === "videoAudio" && " rightBar_file_header_item_active"}`} onClick={() => setType("videoAudio")}>
            Video/Audio
          </div>
          <div className={`rightBar_file_header_item ${type === "doc" && " rightBar_file_header_item_active"}`} onClick={() => setType("doc")}>
            Docs
          </div>
        </div>
        <div className="rightBar_file_body_wraper">{listComponent.map((item, index) => item.type === type && <div key={index}>{item.component}</div>)}</div>
      </div>
    </Base>
  );
};

export default React.memo(Files);
