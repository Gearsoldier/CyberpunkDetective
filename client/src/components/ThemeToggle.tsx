import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "cyan" | "amber" | "violet";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("cyan");

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as Theme;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove old theme classes
    root.classList.remove("theme-cyan", "theme-amber", "theme-violet");
    
    // Add new theme class
    root.classList.add(`theme-${newTheme}`);
    
    // Update CSS variables
    const themes = {
      cyan: {
        primary: "187 85% 28%",
        accent: "38 92% 62%",
      },
      amber: {
        primary: "38 92% 50%",
        accent: "187 85% 45%",
      },
      violet: {
        primary: "270 70% 50%",
        accent: "38 92% 62%",
      },
    };

    const colors = themes[newTheme];
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="hover-elevate"
          data-testid="button-theme-toggle"
        >
          <Palette className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        <DropdownMenuItem
          onClick={() => handleThemeChange("cyan")}
          className={theme === "cyan" ? "bg-primary/20" : ""}
          data-testid="theme-cyan"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-500" />
            <span>Cyan</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("amber")}
          className={theme === "amber" ? "bg-primary/20" : ""}
          data-testid="theme-amber"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span>Amber</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("violet")}
          className={theme === "violet" ? "bg-primary/20" : ""}
          data-testid="theme-violet"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-violet-500" />
            <span>Violet</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
