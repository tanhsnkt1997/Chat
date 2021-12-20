import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import roomAction from "../../../../redux/action/room";
import "./Doc.css";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const Doc = ({ roomId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roomAction.getLisDocRoom({ roomId, limit: 20, page: 0 }));
  }, [dispatch, roomId]);
  const listDoc = useSelector((state) => state.room.listDoc);
  return (
    <div>
      {listDoc.map((item, index) => (
        <div key={index} className="rightBar_doc_container">
          <div className="rightBar_doc_thumb_wraper">
            <InsertDriveFileIcon className="rightBar_doc_thumb" />
            <h6 className="rightBar_doc_thumb_type">{item.fileName.split(".")[item.fileName.split(".").length - 1]}</h6>
          </div>

          <div className="rightBar_doc_description">
            <h5 className="rightBar_doc_description_name">{item.fileName}</h5>
            <h6>{moment(item.createdAt).format("DD/MM/YYYY")}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Doc);
