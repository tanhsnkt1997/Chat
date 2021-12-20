import React, { useState, useEffect, useRef } from "react";
import OnOutsiceClick from "react-outclick";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Forward from "./forward/forward.jsx";
import Remove from "./remove/remove.jsx";
import "./MoreAction.css";

const MoreAction = ({ messageId, message, files, messageType }) => {
  const moreActionItemRef = useRef();
  const [showMore, setShowMore] = useState(false);

  //check lai last message sau khi xoa tin nhan
  const checkShow = () => {
    setShowMore((state) => !state);
  };
  return (
    <OnOutsiceClick
      onOutsideClick={() => {
        setShowMore(false);
      }}
    >
      <div className="chatShow__messageItem_moreAction_container">
        <MoreVertIcon className="chatShow___body_me_tool_message_icon" onClick={checkShow} />
        {showMore && (
          <div className="chatShow___messageItem_moreAction_arround">
            <div className="chatShow__messageItem_moreAction">
              <Remove messageId={messageId} />
              <Forward message={message} files={files} messageType={messageType} />
            </div>
          </div>
        )}
      </div>
    </OnOutsiceClick>
  );
};

export default React.memo(MoreAction);
