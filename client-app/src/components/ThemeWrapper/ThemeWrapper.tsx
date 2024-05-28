import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { Theme } from "react-toastify";

export default function ThemeContextWrapper(props:any) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme() {
    setTheme(theme);
  } 

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
