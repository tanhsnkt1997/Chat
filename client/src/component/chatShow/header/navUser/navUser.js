import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./responsive";
import "./NavUser.css";

const imgLink =
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1140180560";

export default function NavUser() {
  const classes = useStyles();
  const currenRoom = useSelector((state) => state.room.currentRoom);

  return (
    <div className="chatShow___header_navUser_container">
      <div className={`${classes.avatar} chatShow___header_navUser_avatar`}>
        <img
          src={currenRoom?.chatIcon || imgLink}
          alt="img-navUser"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
        />
        <i className="chatShow___header_navUser_status"></i>
      </div>

      <a className={`${classes.name} chatShow___header_navUser_name`} href="/">
        {currenRoom?.name}
      </a>
    </div>
  );
}
