import React from "react";
import { useSelector } from "react-redux";
import Header from "./header/header";
import Body from "./body/body";
import Footer from "./footer/footer";
import "./ChatShow.css";

const Content = ({ setOpenRightBar, matchesDownSm }) => {
  const currenRoom = useSelector((state) => state.room.currentRoom);
  return (
    <>
      {(!matchesDownSm || currenRoom?._id) && (
        <div className="chatShowContainer">
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              height: "100%",
            }}
          >
            {currenRoom ? (
              <>
                <Header setOpenRightBar={setOpenRightBar} matchesDownSm={matchesDownSm} />
                <Body />
                <Footer />
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              >
                Please select mesaga chat !!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Content);
