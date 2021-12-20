import React from "react";

const NoData = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={require("../../public/image/no-data.svg").default} alt="no-data" style={{ height: 70, width: 70 }} />
      <div>Không tìm thấy kết quả tìm kiếm!</div>
    </div>
  );
};

export default React.memo(NoData);
