import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="loader"></div>
      <p className="loading-text">Loading content...</p>
    </div>
  );
};

export default Loading;