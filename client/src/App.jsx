import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddMemberPage from "./pages/AddMemberPage";
import ViewMembersPage from "./pages/ViewMembersPage";
import MemberDetailsPage from "./pages/MemberDetailsPage";
import { api } from "./api";

function App() {
  const [teamName, setTeamName] = useState("Visionary Coders");

  useEffect(() => {
    const loadTeamName = async () => {
      try {
        const response = await api.get("/team");
        setTeamName(response.data.teamName || "Visionary Coders");
      } catch (_error) {
        setTeamName("Visionary Coders");
      }
    };

    loadTeamName();
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>{teamName}</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-member">Add Member</NavLink>
          <NavLink to="/members">View Members</NavLink>
        </nav>
      </header>

      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage teamName={teamName} />} />
          <Route path="/add-member" element={<AddMemberPage />} />
          <Route path="/members" element={<ViewMembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
