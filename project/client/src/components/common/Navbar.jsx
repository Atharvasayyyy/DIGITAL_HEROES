import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={{ background: "#1f2937", color: "#ffffff", padding: "16px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.2rem" }}>
          Digital Heroes
        </Link>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/migration-plan">Migration Plan</Link>
          <Link to="/refactor">Refactor</Link>
          <Link to="/engineering-standards">Engineering Standards</Link>
        </nav>
      </div>
    </header>
  );
}
