export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  matches: number;
  wins: number;
  loses: number;
  plus: number;
  minus: number;
  points: number;
  league: number;
}

interface MatchPlayer {
  name: string;
  score: number | null;
}

export interface Match {
  id: number;
  first_player: MatchPlayer;
  second_player: MatchPlayer;
  played?: boolean;
  date?: Date;
  court?: number;
  league: number;
}

export interface Sheet {
  properties: { title: string };
}

export interface MatchDay {
  [date: string]: Match[];
}

export interface MatchesForDate {
  [key: string]: Match[];
}
