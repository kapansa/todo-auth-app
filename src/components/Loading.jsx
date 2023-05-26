import React from "react";
import Load from "../assets/load.gif";

export const Loading = () => {
  return (
    <div className="loadImage">
      <img src={Load} alt="load_image" />
    </div>
  );
};

export default React.memo(Loading);
