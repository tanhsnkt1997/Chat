import React from "react";
import "./Carousel.css";

const imgLink = "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1140180560";
export default function carousel() {
  return (
    <div className="sideBar__body_header_carousel_container">
      <ul className="sideBar__body_header_carousel_list">
        <li className="sideBar__body_header_carousel_status_box">
          <div className="sideBar__body_header_carousel_title">Anh</div>
          <div className="sideBar__body_header_carousel_img_wraper">
            <img src={imgLink} alt="img_carousel" className="sideBar__body_header_carousel_img"></img>
          </div>
        </li>
        {/*  */}
        <li className="sideBar__body_header_carousel_status_box">
          <div className="sideBar__body_header_carousel_title">Anh</div>
          <div className="sideBar__body_header_carousel_img_wraper">
            <img src={imgLink} alt="img_carousel" className="sideBar__body_header_carousel_img"></img>
          </div>
        </li>
        <li className="sideBar__body_header_carousel_status_box">
          <div className="sideBar__body_header_carousel_title">Anh</div>
          <div className="sideBar__body_header_carousel_img_wraper">
            <img src={imgLink} alt="img_carousel" className="sideBar__body_header_carousel_img"></img>
          </div>
        </li>
        <li className="sideBar__body_header_carousel_status_box">
          <div className="sideBar__body_header_carousel_title">Anh</div>
          <div className="sideBar__body_header_carousel_img_wraper">
            <img src={imgLink} alt="img_carousel" className="sideBar__body_header_carousel_img"></img>
          </div>
        </li>
      </ul>
    </div>
  );
}
