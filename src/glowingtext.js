import React from "react";
import "./App.css";

const GlowingText = ({ text }) => {
  return (
    <div className="glowing-text">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            animationDelay: `${index * 0.3}s`,
            marginRight: letter === " " ? "0" : "0.2em",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default GlowingText;
