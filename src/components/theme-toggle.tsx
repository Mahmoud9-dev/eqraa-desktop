
import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getLabel = () => {
    return theme === "dark" ? t.common.darkMode : t.common.lightMode;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative touch-target"
      onClick={toggleTheme}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className="relative flex items-center justify-center h-[1.2rem] w-[1.2rem]">
        <img
          src="/sun.svg"
          alt=""
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
            theme === "dark"
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-0"
          }`}
        />
      </div>
      <span className="sr-only">{t.common.toggleTheme}</span>
    </Button>
  );
}
