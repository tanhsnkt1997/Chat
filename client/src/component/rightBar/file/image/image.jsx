import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomAction from "../../../../redux/action/room";
import "./Image.css";

const Image = ({ roomId }) => {
  const dispatch = useDispatch();
  const listImageRoom = useSelector((state) => state.room.listImageRoom);

  useEffect(() => {
    dispatch(roomAction.getListImgRoom({ roomId, limit: 20, page: 0 }));
  }, [dispatch, roomId]);

  return (
    <div className="image-grid">
      {listImageRoom.map((item, index) => (
        <img key={index} className="grid-image" src={`${item.thumb}`} alt="img" />
      ))}
    </div>
  );
};

export default React.memo(Image);
