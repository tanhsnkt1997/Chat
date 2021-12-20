import React, { useEffect, useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteLoader from "react-window-infinite-loader";
import { AutoSizer } from "react-virtualized";
import { createSelector } from "reselect";
import { FixedSizeList as List } from "react-window";
import Modal from "@material-ui/core/Modal";
import roomAction from "../../../redux/action/room";
import MainPlayer from "./mainPlayer.jsx";
import PlayerItem from "./playerItem.jsx";
import "./Player.css";

const messageTypeAccept = ["file", "text-file"];
const resourceTypeAccept = ["image", "video"];
const selectListFileMedia = createSelector(
  [(state) => state.message.listMessage, (state) => state.room.allMedia],
  (listmessage, allMediaServer) => {
    let allMultimediaStore = listmessage.reduce((acc, curr, index, array) => {
      if (messageTypeAccept.includes(curr.messageType)) {
        let fileMedias = curr.file.filter((file) => resourceTypeAccept.includes(file.resource_type) && file.thumb);
        acc.unshift(...fileMedias);
      }
      return acc;
    }, []);
    return [...allMediaServer, ...allMultimediaStore];
  }
);

const Player = ({ openModalPlayer, setOpenModalPlayer, activeObject }) => {
  const isFirstClick = useRef(true);
  const listRef = useRef();
  const dispatch = useDispatch();
  const [itemSelected, setItemSelected] = useState(null);
  const allMultimedia = useSelector((state) => selectListFileMedia(state));

  useEffect(() => {
    if (allMultimedia.length > 0 && isFirstClick.current) {
      let findindex = allMultimedia.findIndex((media) => media._id === activeObject.item._id);
      setItemSelected({
        data: activeObject.item,
        index: findindex,
      });
    }
  }, [allMultimedia.length]);

  // scroll after index change
  useEffect(() => {
    if (itemSelected?.index && isFirstClick.current) {
      isFirstClick.current = false;
      listRef.current?._listRef.scrollToItem(itemSelected.index, "center");
    }
  }, [itemSelected?.index]);

  const loadMoreItems = (startIndex, stopIndex) => {
    console.log("vao loadmore ne");
    dispatch(
      roomAction.getAllMultimedia({
        chatRoomId: activeObject.chatRoomId,
        messageId: activeObject.messageId,
        type: "next",
        limit: 10,
      })
    );
    // if ((allMultimedia.length < 30 && isFirstClick.current) || (allMultimedia.length > 30 && !isFirstClick.current)) { }
  };

  return (
    <Modal
      open={openModalPlayer}
      onClose={() => setOpenModalPlayer(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={"modal_add_group"}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MainPlayer
          itemSelected={itemSelected}
          listRef={listRef}
          setItemSelected={setItemSelected}
          setOpenModalPlayer={setOpenModalPlayer}
          allMultimedia={allMultimedia}
        />

        <AutoSizer disableHeight>
          {({ width }) => (
            <InfiniteLoader
              isItemLoaded={(index) => index < allMultimedia.length - 1}
              itemCount={allMultimedia.length}
              loadMoreItems={loadMoreItems}
              ref={listRef}
              threshold={2}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  // direction="ltr"
                  ref={ref}
                  height={75}
                  width={width}
                  onItemsRendered={onItemsRendered}
                  itemCount={allMultimedia.length}
                  itemSize={70}
                  itemData={allMultimedia}
                  layout="horizontal"
                  // initialScrollOffset={100} //pixel
                  style={{ background:"#444950"}}
                >
                  {({ data, index, style }) => (
                    <div style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <PlayerItem
                        data={data}
                        index={index}
                        itemSelected={itemSelected}
                        setItemSelected={setItemSelected}
                        listRef={listRef}
                      />
                    </div>
                  )}
                </List>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    </Modal>
  );
};

export default React.memo(Player);
