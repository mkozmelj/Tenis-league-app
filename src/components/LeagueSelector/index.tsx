import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getLeagues } from "../../common/api";
import { LeagueContext } from "../../common/context";
import { isMobile } from "../../common/utils";

import "./index.scss";

export function LeagueSelector(): JSX.Element {
  const navigate = useNavigate();
  const { league, setLeague } = useContext(LeagueContext);
  const [leagues, setLeagues] = useState<number[]>();

  const handleChangeLeague = useCallback((index: number) => {
    setLeague(index);
    localStorage.setItem("league", index.toString());
  }, []);

  useEffect(() => {
    getLeagues().then((response) => setLeagues(response));
  }, []);

  if (!leagues?.length || location.pathname === "/calendar") {
    return <></>;
  }

  return (
    <div className={`league-selector ${isMobile() ? "mobile" : "desktop"}`}>
      {leagues.map((index: number) => (
        <div
          key={index}
          className={`${league === index ? "active" : ""}`}
          onClick={() => handleChangeLeague(index)}
        >
          {index}. liga
        </div>
      ))}
      <div className="calendar" onClick={() => navigate("/calendar")}>
        Koledar
      </div>
    </div>
  );
}
