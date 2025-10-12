"use client";

import { useEffect, useState, type FC } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "./ui/button";

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light" | "system" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "light";
      return "system"; // Fallback or if you want to cycle through system
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="absolute top-4 right-4">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;