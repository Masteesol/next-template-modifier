import { useEffect, useState } from "react";

type ToggleDarkModeFn = () => void;

const useDarkMode = (): [boolean, ToggleDarkModeFn] => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "darkMode") {
        setDarkMode(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleDarkMode: ToggleDarkModeFn = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;