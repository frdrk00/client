import React from "react";
import "../assets/css/Loader.css";

const MainLoader = () => {
  return (
    <div className=" flex items-center justify-center container">
      <div className="svg-loader">
        <svg
          className="svg-container"
          height="100"
          width="100"
          viewBox="0 0 100 100"
        >
          <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
          <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
    </div>
  );
};

export default MainLoader;
