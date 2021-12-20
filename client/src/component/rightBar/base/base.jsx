import React from "react";
import "./Base.css";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const Base = ({ children, setOpen, title, description }) => {
  return (
    <div className="RightBar__LeftSide">
      <div className="RightBar__LeftSide_header">
        <div className="RightBar__LeftSide_header_title_wraper">
          <h2>{title}</h2>
          <h5>{description}</h5>
        </div>

        <div className="RightBar__LeftSide_header_icon_wraper" onClick={() => setOpen(false)}>
          <CancelRoundedIcon className="RightBar__LeftSide_header_icon" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default React.memo(Base);
