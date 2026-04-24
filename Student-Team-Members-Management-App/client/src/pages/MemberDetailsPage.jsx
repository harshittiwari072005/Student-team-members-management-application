import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, UPLOADS_BASE_URL } from "../api";

function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMember = async () => {
      try {
        const response = await api.get(`/members/${id}`);
        setMember(response.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to fetch member details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/members/${id}`);
      navigate("/members");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this member right now."
      );
    }
  };

  if (loading) {
    return <p className="status">Loading member details...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  if (!member) {
    return <p className="status">Member not found.</p>;
  }

  return (
    <section className="member-details-layout">
      <article className="member-details-card">
        <img
          className="member-details-image"
          src={`${UPLOADS_BASE_URL}/${member.image}`}
          alt={member.fullName}
        />
        <div className="member-details-content">
          <p className="eyebrow">Member Details</p>
          <h2>{member.fullName}</h2>
          <div className="details-grid">
            <div>
              <span>Role</span>
              <strong>{member.role}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{member.email}</strong>
            </div>
            <div>
              <span>Contact</span>
              <strong>{member.contactNumber}</strong>
            </div>
            <div>
              <span>Department</span>
              <strong>{member.department}</strong>
            </div>
          </div>
          <div className="bio-panel">
            <span>Bio</span>
            <p>{member.bio || "No additional details provided."}</p>
          </div>
          <div className="details-actions">
            <Link className="secondary-button" to="/members">
              Back to Members
            </Link>
            <button
              className="danger-button"
              type="button"
              onClick={handleDelete}
            >
              Delete Member
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MemberDetailsPage;
