import React, { useEffect } from "react";
import "./Body.css";
import { defaultMemoize, createSelector } from "reselect";
import { useSelector, shallowEqual } from "react-redux";
import RoomList from "./roomList.jsx";
import RoomListSearch from "./listSearch.jsx";
import resultMemoize from "../../../../helper/resultMemoize";

const memoizeArrayProducingFn = (fn) => {
  const memArray = defaultMemoize((...array) => array);
  return (...args) => memArray(...fn(...args));
};

const selectListRoom = resultMemoize(
  [
    (state) => state.room.isSearch,
    (state) => state.room.lisRoomSearch,
    (state) => state.room.listRoom,
  ],
  (isSearch, lisRoomSearch, listRoom) => (isSearch ? lisRoomSearch : listRoom)
  // memoizeArrayProducingFn(
  //   (isSearch, lisRoomSearch, listRoom) => {
  //     console.log("lisRoomSearch", lisRoomSearch);
  //     console.log("listRoom", listRoom);
  //     return isSearch ? lisRoomSearch : listRoom;
  //   }
  //   // isSearch ? lisRoomSearch : listRoom
  // )
);

const Body = () => {
  const query = useSelector((state) => state.room.query);
  // const test = useSelector((state) =>
  //   state.room.isSearch ? state.room.lisRoomSearch.data : state.room.listRoom.data
  // );

  // console.log("testtttttttt", test);
  // const listMessageCustomDate = useSelector((state) => selectListRoom(state), shallowEqual);
  // const listMessageCustomDate = useSelector((state) => state.room.lisRoomSearch, shallowEqual);

  const isQuery = () => {
    if (query) {
      console.log("vao trueeeeee");
      return true;
    } else {
      console.log("vao false");
      return false;
    }
  };

  return (
    <div className="sideBar__body_container">
      <h2 className="sideBar__body_title">Recent</h2>
      <div className="sideBar__body_list_wraper">
        {isQuery() && (
          <ul className="sideBar__body_list_ul">
            <RoomListSearch query={query} />
          </ul>
        )}
        <ul className="sideBar__body_list_ul" style={{ display: !isQuery() ? "block" : "none" }}>
          <RoomList />
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Body);
