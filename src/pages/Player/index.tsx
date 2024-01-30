import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LeagueContext } from "../../common/context";
import { getMatches, getPlayers } from "../../common/api";
import { Match, PlayerName } from "../../common/types";

import "./index.scss";

export function Player() {
  const { name } = useParams();
  const { league } = useContext(LeagueContext);

  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<PlayerName[]>([]);
  const [missingMatches, setMissingMatches] = useState<string[]>([]);

  const firstname = name?.split("-")[0];
  const lastname = name?.split("-").slice(1).join(" ");
  const parsedName = name?.split("-").join(" ");

  useEffect(() => {
    getMatches(league).then((response) =>
      setMatches(
        response.filter(
          (match) =>
            match.first_player.name === parsedName ||
            match.second_player.name === parsedName
        )
      )
    );
  }, [league]);

  useEffect(() => {
    getPlayers(league).then((data) => setPlayers(data));
  }, [league]);

  useEffect(() => {
    if (matches.length && players.length) {
      setMissingMatches(
        players
          .filter((player) => player.name !== parsedName)
          .map((player) => {
            if (
              !matches.some(
                (match) =>
                  match.first_player.name === player.name ||
                  match.second_player.name === player.name
              )
            ) {
              return player.name;
            } else {
              return "";
            }
          })
          .filter((player) => player !== "")
      );
    }
  }, [players, matches]);

  return (
    <div className="player">
      <b className="name">
        {firstname} {lastname}
      </b>
      <div>
        {missingMatches.map((player) => (
          <div key={player}>
            <p>{`${parsedName} : ${player}`}</p>
          </div>
        ))}
        {matches.map((match) => (
          <div key={match.id}>
            <p>{`${match.first_player.name} : ${match.second_player.name} ${
              match.played &&
              `(${match.first_player.score}:${match.second_player.score}`
            })`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
