import { useContext, useEffect, useState } from "react";
import { getTableData } from "../../common/api";
import { LeagueContext } from "../../common/context";
import { Player } from "../../common/types";

import "./index.scss";

export function Table(): JSX.Element {
  const [players, setPlayers] = useState<Player[]>();
  const { league } = useContext(LeagueContext);

  useEffect(() => {
    getTableData(league).then((response) => setPlayers(response));
  }, [league]);

  if (!players?.length) {
    return <></>;
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className="name">Igralec</th>
            <th>OT</th>
            <th>Z</th>
            <th>P</th>
            <th>+/-</th>
            <th>T</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: Player, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="name">
                {player.firstname} {player.lastname}
              </td>
              <td>{player.matches}</td>
              <td>{player.wins}</td>
              <td>{player.loses}</td>
              <td>
                {player.plus}/{player.minus}
              </td>
              <td>{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
