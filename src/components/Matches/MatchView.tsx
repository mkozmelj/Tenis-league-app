import { useEffect, useState } from "react";
import { Match, MatchDay } from "../../common/types";
import { isMobile, sortMatchesForDate } from "../../common/utils";
import { MatchList } from "./MatchList";
import { addHours } from "date-fns";
import { groupBy } from "lodash";

const categories = ["Planirane tekme", "Odigrane tekme"];

interface IProps {
  matches: Match[];
}

export function MatchView({ matches }: IProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [playedMatches, setPlayedMatches] = useState<MatchDay>();
  const [scheduledMatches, setScheduledMatches] = useState<MatchDay>();

  useEffect(() => {
    if (matches) {
      setPlayedMatches(
        sortMatchesForDate(
          groupBy(
            matches.filter((match: Match) => match.played && match.date),
            (match: Match) =>
              match.date && addHours(match.date, -match.date.getHours())
          )
        )
      );
      setScheduledMatches(
        sortMatchesForDate(
          groupBy(
            matches.filter((match: Match) => !match.played && match.date),
            (match: Match) =>
              match.date && addHours(match.date, -match.date.getHours())
          )
        )
      );
    }
  }, [matches]);

  return (
    <div className="matches">
      {isMobile() ? (
        <>
          <div className="categories">
            {categories.map((category: string) => (
              <h2
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </h2>
            ))}
          </div>
          {scheduledMatches && (
            <MatchList
              isOpened={activeCategory === categories[0]}
              matches={scheduledMatches}
              reverse={true}
            />
          )}
          {playedMatches && (
            <MatchList
              isOpened={activeCategory === categories[1]}
              matches={playedMatches}
            />
          )}
        </>
      ) : (
        <div className="list">
          <div className="match-list">
            <h2>{categories[0]}</h2>
            {scheduledMatches && (
              <MatchList
                isOpened={true}
                matches={scheduledMatches}
                reverse={true}
              />
            )}
          </div>
          <div className="match-list">
            <h2>{categories[1]}</h2>
            {playedMatches && (
              <MatchList isOpened={true} matches={playedMatches} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
