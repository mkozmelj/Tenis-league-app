import { isMobile } from "../../common/utils";
import { LeagueSelector } from "../LeagueSelector";

import "./index.scss";

export function Navbar() {
  return (
    <div className="navbar">
      <a href="/">
        <img alt="logo" src="/assets/logo.png" />
        <h3>Tenis liga Trje</h3>
      </a>
      {!isMobile() && <LeagueSelector />}
    </div>
  );
}
