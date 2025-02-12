import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getLeagues } from "../../common/api";
import { LeagueContext } from "../../common/context";
import { isMobile } from "../../common/utils";

import "./index.scss";

export function LeagueSelector(): JSX.Element {
  const navigate = useNavigate();
  const { league, setLeague } = useContext(LeagueContext);
  const [leagues, setLeagues] = useState<string[]>();

  const handleChangeLeague = useCallback((newLeague: string) => {
    setLeague(newLeague);
    localStorage.setItem("league", newLeague);
  }, []);

  useEffect(() => {
    getLeagues().then((response) => setLeagues(response));
  }, []);

  if (!leagues?.length || location.pathname === "/calendar") {
    return <></>;
  }

  return (
    <div className={`league-selector ${isMobile() ? "mobile" : "desktop"}`}>
      {leagues.map((element: string) => (
        <div
          key={element}
          className={`${league === element ? "active" : ""}`}
          onClick={() => handleChangeLeague(element)}
        >
          {element}
        </div>
      ))}
      <div className="calendar" onClick={() => navigate("/calendar")}>
        Koledar
      </div>
    </div>
  );
}
