import { Collapse } from "react-collapse";
import { Match as MatchI, MatchDay } from "../../common/types";
import { compareAsc, compareDesc, format } from "date-fns";
import { Fragment, useState } from "react";
import { Match } from "./Match";
import { Pagination } from "../Pagination";

interface IProps {
  matches: MatchDay;
  isOpened: boolean;
  reverse?: boolean;
}

const numberOfItems = 7;

export function MatchList({
  matches,
  isOpened,
  reverse = false,
}: IProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);

  let matchesArr = Object.keys(matches).sort((a: string, b: string) =>
    a < b ? -1 : 1
  );

  matchesArr = matchesArr.sort((a: string, b: string) =>
    reverse
      ? compareAsc(new Date(a), new Date(b))
      : compareDesc(new Date(a), new Date(b))
  );

  const numberOfPages = matchesArr.length / numberOfItems;
  const startIndex = currentPage * numberOfItems;

  return (
    <Collapse isOpened={isOpened}>
      {matchesArr
        .slice(startIndex, startIndex + numberOfItems)
        .map((matchDate) => (
          <div key={matchDate}>
            <h3 className="match-date">
              {format(new Date(matchDate), "eeee, d. M. yyyy")}
            </h3>
            {matches[matchDate]
              .sort((a: MatchI, b: MatchI) =>
                a.date && b.date ? compareAsc(a.date, b.date) : 1
              )
              .map((match: MatchI, index: number) => (
                <Fragment key={index}>
                  <Match match={match} />
                </Fragment>
              ))}
          </div>
        ))}
      {numberOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
        />
      )}
    </Collapse>
  );
}
