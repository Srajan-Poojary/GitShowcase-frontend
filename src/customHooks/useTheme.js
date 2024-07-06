import { useEffect } from "react";

const themes = {
  theme1: {
    "--primary-color": "#C7BBFF",
    "--secondary-color": "#1E1E29",
    "--secondary-font": "Poppins, sans-serif",
  },
};

const useTheme = (theme) => {
  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = themes[theme] || themes["theme1"];
    for (const [variable, value] of Object.entries(selectedTheme)) {
      root.style.setProperty(variable, value);
    }
  }, [theme]);
};

export default useTheme;
