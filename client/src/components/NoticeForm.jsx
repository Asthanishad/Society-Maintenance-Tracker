import { useState } from "react";

const NoticeForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPinned: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    setFormData({
      title: "",
      description: "",
      isPinned: false,
    });
  };

  return (
    <div className="card-box mb-4">
      <h4 className="mb-3">Create Notice</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPinned"
            name="isPinned"
            checked={formData.isPinned}
            onChange={handleChange}
          />

          <label
            className="form-check-label"
            htmlFor="isPinned"
          >
            Pin this Notice
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;