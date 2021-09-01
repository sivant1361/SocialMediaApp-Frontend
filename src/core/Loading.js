import React from "react";
import loadingImg from "../images/loading.gif";

const Loading = () => {
  return (
    <div
      className="row justify-content-center"
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Verdana",
        }}
      >
        LOADING...
      </h2>
      <img src={loadingImg} alt="loading" style={{ width: "60%" }} />
    </div>
  );
};

export default Loading;
