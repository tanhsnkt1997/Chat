import React from "react";
import logo from "../../../public/image/logo.svg";
import "./Logo.css";

export default function index() {
  return (
    <div className="navBar__logo_container">
      <img className="navBar__logo_img" src={logo} alt="img_logo" />
    </div>
  );
}
