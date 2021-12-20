import React from "react";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";

const Attachment = ({ chooseImgs }) => {
  //
  return (
    <>
      <label htmlFor="select-img">
        <AttachFileOutlinedIcon className="chatShow___footer_toolbox_file" />
      </label>
      <input
        onChange={(e) => chooseImgs(Array.from(e.target.files))}
        id="select-img"
        type="file"
        multiple
        style={{ display: "none" }}
      />
    </>
  );
};

export default React.memo(Attachment);
