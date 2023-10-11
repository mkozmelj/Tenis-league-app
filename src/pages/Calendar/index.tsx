import { addDays, differenceInDays, format, isSameDay } from "date-fns";
import { groupBy, isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { getAllMatches } from "../../common/api";
import { Match, MatchesForDate } from "../../common/types";
import { getMatchForCourtAndHour } from "../../common/utils";
import { DaySelector } from "../../components/DaySelector";

import "./index.scss";

export function Calendar(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchesForDate, setMatchesForDate] = useState<MatchesForDate>();

  useEffect(() => {
    getAllMatches().then((response: Match[]) => setMatches(response));
  }, []);

  useEffect(() => {
    setMatchesForDate(
      groupBy(
        matches.filter(
          (match: Match) =>
            match.date && differenceInDays(match.date, date) < 14
        ),
        (match: Match) => match.court
      )
    );
  }, [matches, date]);

  const getMatchesForDate = (date: Date) =>
    matches.filter((match: Match) => match.date && isSameDay(match.date, date));

  return (
    <div className="calendar">
      <DaySelector date={date} setDate={setDate} />
      <div className="day">
        {!isEmpty(matchesForDate) ? (
          <>
            <table>
              <thead>
                <tr>
                  <td className="hour"></td>
                  <td className="spaced"></td>
                  {Array.from({ length: 14 }, (_, index) => index).map(
                    (index) => (
                      <>
                        <td className="match" key={`date-${index}`} colSpan={2}>
                          {format(addDays(date, index), "EEEE, d. M. yyyy")}
                        </td>
                        <td className="spaced"></td>
                      </>
                    )
                  )}
                </tr>
                <tr>
                  <td className="hour"></td>
                  <td className="spaced"></td>
                  {Array.from({ length: 14 }, (_, index) => index).map(() => (
                    <>
                      <td className="match">1</td>
                      <td className="match">2</td>
                      <td className="spaced"></td>
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(Array(15).keys())
                  .map((i) => i + 8)
                  .map((index: number) => (
                    <tr key={index}>
                      <td className="hour">{index}</td>
                      <td className="spaced"></td>
                      {Array.from({ length: 14 }, (_, index) => index).map(
                        (day: number) => (
                          <>
                            {["1", "2"].map((court: string) => (
                              <td
                                key={`${index}-${court}`}
                                className={`match league-${
                                  getMatchForCourtAndHour(
                                    index,
                                    getMatchesForDate(
                                      addDays(date, day)
                                    ).filter(
                                      (match: Match) =>
                                        match.court && match.court === +court
                                    )
                                  )?.league
                                }`}
                              >
                                {getMatchForCourtAndHour(
                                  index,
                                  getMatchesForDate(addDays(date, day)).filter(
                                    (match: Match) =>
                                      match.court && match.court === +court
                                  )
                                )
                                  ? `${index}.00`
                                  : ""}
                                <br />
                                {matchesForDate[court] &&
                                  getMatchForCourtAndHour(
                                    index,
                                    getMatchesForDate(
                                      addDays(date, day)
                                    ).filter(
                                      (match: Match) =>
                                        match.court && match.court === +court
                                    )
                                  )?.match}
                              </td>
                            ))}
                            <td className="spaced"></td>
                          </>
                        )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          "Za ta dan ni planiranih tekem"
        )}
      </div>
      <div className="legend">
        {[1, 2, 3].map((league: number) => (
          <Fragment key={league}>
            <div className={`league-${league}`}></div>
            <p>{league}. liga</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
