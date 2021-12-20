import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ForwardtItem from "./forwardItem.jsx";

const sliceAndSelect = createSelector([(state) => state.room.listRoom.data], (rooms) => rooms.slice(0, 6));

const ForwardList = ({ listContactId, setListContactId, userId, message, messageType, files }) => {
  const dataSlice = useSelector((state) => sliceAndSelect(state));
  const test = useSelector((state) => state.room.listRoom.data);
  console.log("testtesttest", test);
  console.log("dataSlice", dataSlice);

  return (
    <div className="modalAdd__body_group_add_member_wraper">
      <div>Gần đây</div>
      <ul style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {dataSlice.map((item, index) => (
          <ForwardtItem
            key={index}
            item={item}
            listContactId={listContactId}
            setListContactId={setListContactId}
            userId={userId}
            message={message}
            messageType={messageType}
            files={files}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ForwardList);
