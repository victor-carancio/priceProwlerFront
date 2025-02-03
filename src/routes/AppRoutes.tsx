import { Route, Routes } from "react-router-dom";

import Results from "../features/search/Results.page";

import TermOfUse from "../features/term-of-use/TermOfUse.page";
import Home from "../features/home/Home.page";
import AdvanceResults from "../features/advance-search/AdvanceResults.page";
import GameDetail from "../features/game-detail/GameDetail.page";
import NotFound from "../features/not-found/NotFound.page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/filters-results" element={<AdvanceResults />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/term-of-use" element={<TermOfUse />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
