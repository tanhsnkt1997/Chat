import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const MainPlayer = ({ allMultimedia, itemSelected, setItemSelected, setOpenModalPlayer, listRef }) => {
  const handleClick = (possition) => {
    const { data, index } = itemSelected;
    if (possition === "next") {
      if (listRef.current && allMultimedia[index + 1]) {
        listRef.current._listRef.scrollToItem(index + 1);
        setItemSelected({ data: allMultimedia[index + 1], index: index + 1 });
      }
    } else {
      if (listRef.current && allMultimedia[index - 1]) {
        listRef.current._listRef.scrollToItem(index - 1);
        setItemSelected({ data: allMultimedia[index - 1], index: index - 1 });
      }
    }
  };

  const RenderByType = () => {
    if (itemSelected.data.resource_type === "video") {
      return (
        <video controls width="80%" autoPlay style={{ zIndex: 2 }}>
          <source src={itemSelected.data.url} />
        </video>
      );
    } else {
      return (
        <img
          src={itemSelected.data.url}
          style={{ maxWidth: "80%", maxHeight: "90%", objectFit: "contain", zIndex: 200 }}
          alt=""
        />
      );
    }
  };
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{ position: "absolute", left: "5px", top: "5px", cursor: "pointer", zIndex: 1 }}
        onClick={() => setOpenModalPlayer(false)}
      >
        <CancelIcon style={{ color: "#fff", fontSize: "2rem" }} />
      </div>
      <div
        style={{
          backgroundImage: `url(${itemSelected.data.thumb})`,
          filter: "blur(10px)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
      {itemSelected && <RenderByType />}
      <div
        style={{
          display: itemSelected.index === 0? "none": "flex",
          position: "absolute",
          left: 0,
          cursor: "pointer",
          background: "#f5f5f5",
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",
          borderRadius: "50%",
          zIndex: 1,
        }}
        onClick={() => handleClick("prev")}
      >
        <ArrowBackIosIcon />
      </div>
      <div
        style={{
          display: itemSelected.index ===  allMultimedia.length -1? "none": "flex",
          position: "absolute",
          right: 0,
          cursor: "pointer",
          background: "#f5f5f5",
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "4px",
          borderRadius: "50%",
          zIndex: 1,
        }}
        onClick={() => handleClick("next")}
      >
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default React.memo(MainPlayer);
