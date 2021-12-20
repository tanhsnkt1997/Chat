import React from "react";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";

const Img = ({ chooseImgs }) => {
  //
  return (
    <>
      <label htmlFor="select-img">
        <PhotoOutlinedIcon className="chatShow___footer_toolbox_photo" />
      </label>
      <input onChange={(e) => chooseImgs(Array.from(e.target.files))} id="select-img" type="file" multiple style={{ display: "none" }} accept="image/*" />
    </>
  );
};

export default React.memo(Img);
