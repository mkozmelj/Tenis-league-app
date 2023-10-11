import { Match as MatchI } from "../../common/types";
import { format } from "date-fns";

interface IProps {
  match: MatchI;
}

export function Match({ match }: IProps): JSX.Element {
  return (
    <div className="match">
      <p
        className={
          (match.first_player.score ?? 0) > (match.second_player.score ?? 0)
            ? "bold"
            : ""
        }
      >
        {match.first_player.name}
        <span>
          {match.played
            ? match.first_player.score
            : match.date
            ? format(match.date, "H:mm")
            : ""}
        </span>
      </p>
      <p
        className={
          (match.first_player.score ?? 0) < (match.second_player.score ?? 0)
            ? "bold"
            : ""
        }
      >
        {match.second_player.name}
        <span>
          {match.played ? (
            match.second_player.score
          ) : (
            <span className={`badge badge-${match.court}`}>
              {match.court}. igrišče
            </span>
          )}
        </span>
      </p>
    </div>
  );
}
