import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ setIsSearch }) => {
  return (
    <div onClick={() => setIsSearch((state) => !state)} className="chatShow___header_navToolBox_icon_wraper">
      <SearchIcon className="chatShow___header_navToolBox_icon" />
    </div>
  );
};

export default React.memo(Search);
