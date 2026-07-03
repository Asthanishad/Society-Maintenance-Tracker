import { useState } from "react";

const ComplaintForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);

    setTitle("");
    setDescription("");
    setImage(null);

    e.target.reset();
  };

  return (
    <div className="card-box mb-4">

      <h4 className="mb-3">
        Register Complaint
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">
            Title
          </label>

          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Complaint Image
          </label>

          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit Complaint
        </button>

      </form>

    </div>
  );
};

export default ComplaintForm;