import { Link } from "react-router-dom";

function HomePage({ teamName }) {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Welcome</p>
        <h2>{teamName}</h2>
        <p>
          Manage your student team members in one place. Add new members,
          browse the full team list, and open each member profile for complete
          details.
        </p>
        <div className="action-row">
          <Link className="primary-button" to="/add-member">
            Add Member
          </Link>
          <Link className="secondary-button" to="/members">
            View Members
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <h3>What this app includes</h3>
        <ul className="feature-list">
          <li>React Router based page navigation</li>
          <li>MongoDB data storage with Express API</li>
          <li>Profile image uploads and member detail pages</li>
          <li>Clean UI for assignment submission</li>
        </ul>
      </div>
    </section>
  );
}

export default HomePage;
