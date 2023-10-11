import { createContext } from "react";

interface LeagueContextProps {
  league: number;
  setLeague: (league: number) => void;
}

export const LeagueContext = createContext<LeagueContextProps>({
  league: 1,
  setLeague: () => undefined,
});
