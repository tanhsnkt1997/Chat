import React from "react";

const PlayerItem = ({ data, index, setItemSelected, itemSelected, listRef }) => {
  // console.log("listRef===", listRef.current);
  const handleClick = () => {
    console.log("indexx", index);
    if (listRef.current) {
      const _lastRenderedStartIndex = listRef.current._lastRenderedStartIndex;
      const _lastRenderedStopIndex = listRef.current._lastRenderedStopIndex;
      if (index === _lastRenderedStartIndex && index > 0) {
        listRef.current._listRef.scrollToItem(index - 1);
      } else if (index === _lastRenderedStopIndex && index < data.length) {
        listRef.current._listRef.scrollToItem(index + 1);
      }
    }
    setItemSelected({ data: data[index], index });
  };

  return (
    <img
      src={data[index].thumb}
      style={{
        height: "65px",
        width: "65px",
        objectFit: "cover",
        borderRadius: "50%",
        cursor: "pointer",
        border: itemSelected?.index === index ? "2px solid red" : "initial",
        opacity: itemSelected?.index === index ? 1 : 0.5,
      }}
      alt=""
      onClick={handleClick}
    />
  );
};

export default React.memo(PlayerItem);
