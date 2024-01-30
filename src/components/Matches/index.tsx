import { useContext, useEffect, useState } from "react";
import { getMatches } from "../../common/api";
import { LeagueContext } from "../../common/context";
import { Match } from "../../common/types";
import { MatchView } from "./MatchView";

import "./index.scss";

export function Matches(): JSX.Element {
  const { league } = useContext(LeagueContext);

  const [matches, setMatches] = useState<Match[]>();

  useEffect(() => {
    getMatches(league).then((response) => setMatches(response));
  }, [league]);

  if (!matches?.length) {
    return <></>;
  }

  return <MatchView matches={matches} />;
}
