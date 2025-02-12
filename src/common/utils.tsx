import { compareAsc } from "date-fns/esm";
import { Match, MatchDay } from "./types";

export function isMobile() {
  return window.innerWidth < 600;
}

export function getShortName(name: string) {
  const nameArr = name.split(" ");
  return (
    nameArr[0].charAt(0) + ". " + nameArr.slice(1, nameArr.length).join(" ")
  );
}

export function getMatchForCourtAndHour(
  hour: number,
  matches?: Match[]
): { match: string; league: string } | undefined {
  if (!matches) {
    return undefined;
  }

  const match = matches.find((match) => match.date?.getHours() === hour);
  return (
    match && {
      match: `${getShortName(match.first_player.name)} \n ${getShortName(
        match.second_player.name
      )}`,
      league: match.league,
    }
  );
}

export function sortMatchesForDate(matches: MatchDay) {
  const dict = {} as MatchDay;
  const keys = Object.keys(matches).sort((a, b) =>
    compareAsc(new Date(a), new Date(b))
  );

  keys.forEach((key: string) => (dict[key] = matches[key]));

  return dict;
}
