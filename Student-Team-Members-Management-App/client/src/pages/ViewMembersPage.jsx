import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, UPLOADS_BASE_URL } from "../api";

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await api.get("/members");
        setMembers(response.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to fetch members right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const handleDelete = async (memberId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/members/${memberId}`);
      setMembers((current) => current.filter((member) => member._id !== memberId));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this member right now."
      );
    }
  };

  return (
    <section className="content-card">
      <div className="section-heading">
        <p className="eyebrow">View Members</p>
        <h2>All Team Members</h2>
      </div>

      {loading ? <p className="status">Loading members...</p> : null}
      {error ? <p className="status error">{error}</p> : null}

      {!loading && !error && members.length === 0 ? (
        <p className="status">No members found. Add your first member.</p>
      ) : null}

      <div className="members-grid">
        {members.map((member) => (
          <article className="member-card" key={member._id}>
            <img
              src={`${UPLOADS_BASE_URL}/${member.image}`}
              alt={member.fullName}
            />
            <div className="member-card-content">
              <h3>{member.fullName}</h3>
              <p>{member.role}</p>
              <div className="card-actions">
                <Link className="secondary-button" to={`/members/${member._id}`}>
                  View Details
                </Link>
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => handleDelete(member._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ViewMembersPage;
