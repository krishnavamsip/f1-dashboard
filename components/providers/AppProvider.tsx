"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  theme: "dark" | "light";
  toggleTheme: () => void;
  favDriver: string | null;
  setFavDriver: (d: string | null) => void;
  favTeam: string | null;
  setFavTeam: (t: string | null) => void;
};

const Ctx = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [favDriver, setFavDriver] = useState<string | null>("verstappen");
  const [favTeam, setFavTeam] = useState<string | null>("ferrari");

  useEffect(() => {
    const saved = localStorage.getItem("apex-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
    setFavDriver(localStorage.getItem("apex-fav-driver") || "verstappen");
    setFavTeam(localStorage.getItem("apex-fav-team") || "ferrari");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("apex-theme", theme);
  }, [theme]);

  useEffect(() => { if(favDriver) localStorage.setItem("apex-fav-driver", favDriver)}, [favDriver]);
  useEffect(() => { if(favTeam) localStorage.setItem("apex-fav-team", favTeam)}, [favTeam]);

  return <Ctx.Provider value={{ theme, toggleTheme: () => setTheme(t=> t==="dark" ? "light" : "dark"), favDriver, setFavDriver, favTeam, setFavTeam }}>
    {children}
  </Ctx.Provider>
}

export const useApp = () => useContext(Ctx)!;
