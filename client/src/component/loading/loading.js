import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loading.css";

export default function loading() {
  return (
    <div className="loading__container">
      <CircularProgress color="secondary" />
    </div>
  );
}
