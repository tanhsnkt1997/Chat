import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import roomAction from "../../../../redux/action/room";
import "./VideoAudio.css";

const VideoAudio = ({ roomId }) => {
  const dispatch = useDispatch();
  const listVideoAudio = useSelector((state) => state.room.listVideoAudio);
  useEffect(() => {
    dispatch(roomAction.getListVideoAudioRoom({ roomId, limit: 20, page: 0 }));
  }, [dispatch, roomId]);

  return (
    <div>
      {listVideoAudio.map((item, index) => (
        <div key={index} className="rightBar_video_audio_container">
          <img src={item.thumb ? item.thumb : "https://maclife.vn/wp-content/uploads/2020/12/1607580314_audio-playr.png"} alt="img_thumb" className="rightBar_video_audio_thumb" />
          <div className="rightBar_video_audio_description">
            <h5 className="rightBar_video_audio_description_name">{item.fileName}</h5>
            <h6>{moment(item.createdAt).format("DD/MM/YYYY")}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(VideoAudio);
