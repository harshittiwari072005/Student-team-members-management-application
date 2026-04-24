import { useState } from "react";
import { api } from "../api";

const initialForm = {
  fullName: "",
  role: "",
  email: "",
  contactNumber: "",
  department: "",
  bio: "",
};

function AddMemberPage() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!image) {
      setError("Please upload a profile image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", image);

      await api.post("/members", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm(initialForm);
      setImage(null);
      event.target.reset();
      setMessage("Member added successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to add member. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="content-card">
      <div className="section-heading">
        <p className="eyebrow">Add Member</p>
        <h2>Register a new team member</h2>
      </div>

      <form className="member-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role
          <input
            name="role"
            type="text"
            value={form.role}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contact Number
          <input
            name="contactNumber"
            type="text"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Department
          <input
            name="department"
            type="text"
            value={form.department}
            onChange={handleChange}
            required
          />
        </label>

        <label className="full-width">
          Short Bio
          <textarea
            name="bio"
            rows="4"
            value={form.bio}
            onChange={handleChange}
            placeholder="Add a few lines about this team member"
          />
        </label>

        <label className="full-width">
          Upload Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files?.[0] || null)}
            required
          />
        </label>

        {message ? <p className="status success">{message}</p> : null}
        {error ? <p className="status error">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit Member"}
        </button>
      </form>
    </section>
  );
}

export default AddMemberPage;
