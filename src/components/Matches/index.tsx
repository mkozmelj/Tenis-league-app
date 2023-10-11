import { useContext, useEffect, useState } from "react";
import { getMatches } from "../../common/api";
import { LeagueContext } from "../../common/context";
import { Match as MatchI, MatchDay } from "../../common/types";
import { groupBy } from "lodash";
import { addHours } from "date-fns";
import { MatchList } from "./MatchList";
import { isMobile, sortMatchesForDate } from "../../common/utils";

import "./index.scss";

const categories = ["Planirane tekme", "Odigrane tekme"];

export function Matches(): JSX.Element {
  const { league } = useContext(LeagueContext);

  const [matches, setMatches] = useState<MatchI[]>();
  const [playedMatches, setPlayedMatches] = useState<MatchDay>();
  const [scheduledMatches, setScheduledMatches] = useState<MatchDay>();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  useEffect(() => {
    getMatches(league).then((response) => setMatches(response));
  }, [league]);

  useEffect(() => {
    if (matches) {
      setPlayedMatches(
        sortMatchesForDate(
          groupBy(
            matches.filter((match: MatchI) => match.played && match.date),
            (match: MatchI) =>
              match.date && addHours(match.date, -match.date.getHours())
          )
        )
      );
      setScheduledMatches(
        sortMatchesForDate(
          groupBy(
            matches.filter((match: MatchI) => !match.played && match.date),
            (match: MatchI) =>
              match.date && addHours(match.date, -match.date.getHours())
          )
        )
      );
    }
  }, [matches]);

  if (!matches?.length) {
    return <></>;
  }

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
