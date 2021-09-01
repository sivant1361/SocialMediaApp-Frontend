import React from "react";
import MedicalImage from "../../images/bg1.jpg";

function ItemBaseContainer() {
  return (
    <div
      style={{
        backgroundImage: "url(" + MedicalImage + ")",
        backgroundSize: "cover",
        height: "80vh",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "80vh",
          backgroundColor: "rgba(0,0,0,0.25)",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "3.4rem",
              color: "#ddd",
              fontWeight: 600,
              letterSpacing: "5px",
              fontFamily:'Dancing Script'
            }}
            id="skeleton"
          >
            {/* WHAT MAKES US BETTER <br /> MAKES YOU BETTER */}
            What Makes Us Better <br/> Makes You Better
          </div>

          <button
            className="btn btn-lg btn-primary"
            style={{
              fontSize: "1.3vw",
              marginTop: "1.5vw",
              backgroundColor: "#23395d",
              fontWeight: 600,
            }}
            id="skeleton_more"
          >
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              Get Started
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemBaseContainer;
