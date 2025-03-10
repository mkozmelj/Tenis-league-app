import React, { useState } from "react";
import { LeagueContext } from ".";

const LeagueProvider = ({ children }: { children: React.ReactNode }) => {
  const currentLeague = localStorage.getItem("league") ?? "1.liga";
  const [league, setLeague] = useState<string>(currentLeague);

  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      {children}
    </LeagueContext.Provider>
  );
};

export default LeagueProvider;
