import { createContext } from "react";

interface LeagueContextProps {
  league: string;
  setLeague: (league: string) => void;
}

export const LeagueContext = createContext<LeagueContextProps>({
  league: "1.liga",
  setLeague: () => undefined,
});
