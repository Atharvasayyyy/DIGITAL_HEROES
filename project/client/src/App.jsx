import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import MigrationPlan from "./pages/MigrationPlan";
import Refactor from "./pages/Refactor";
import EngineeringStandards from "./pages/EngineeringStandards";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/migration-plan" element={<MigrationPlan />} />
          <Route path="/refactor" element={<Refactor />} />
          <Route path="/engineering-standards" element={<EngineeringStandards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
