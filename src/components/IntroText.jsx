import React from "react";

const IntroText = ({ imgLogo, text, subtitle }) => {
  return (
    <div className="text_area">
      <h1>{text}</h1>
      <p>{subtitle}</p>
      <img src={imgLogo} alt="todo intro app" />
    </div>
  );
};

export default IntroText;
