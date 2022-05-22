import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const CembooPlayerElements = document.querySelectorAll(".cemboo-player");

CembooPlayerElements.forEach((elem) => {
  ReactDOM.render(
    <React.StrictMode>
      <App url="https://dmrfa7me8rf79.cloudfront.net/cemboo-alpha-v1/AppleHLS1/cemboo_final_launch_v1.m3u8" />
    </React.StrictMode>,
    elem
  );
});
