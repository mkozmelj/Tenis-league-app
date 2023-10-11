import LeagueProvider from "./common/context/provider";
import { LeagueSelector } from "./components/LeagueSelector";
import { Navbar } from "./components/Navbar";
import { setDefaultOptions } from "date-fns";
import { sl } from "date-fns/locale";
import { isMobile } from "./common/utils";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Calendar } from "./pages/Calendar";

import "./App.scss";

function App() {
  setDefaultOptions({ locale: sl });

  return (
    <div className="App">
      <LeagueProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
          {isMobile() && <LeagueSelector />}
        </Router>
      </LeagueProvider>
    </div>
  );
}

export default App;
