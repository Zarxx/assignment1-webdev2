import React, { useState } from "react";
import "./Button.css";

const Button = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };
  
  return (
    <button className="toggle-btn" onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default Button;