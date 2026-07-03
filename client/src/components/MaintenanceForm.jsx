import { useState } from "react";

const MaintenanceForm = ({ residents, onCreate }) => {
  const [formData, setFormData] = useState({
    resident: "",
    amount: "",
    month: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    setFormData({
      resident: "",
      amount: "",
      month: "",
      dueDate: "",
    });
  };

  return (
    <div className="card-box mb-4">

      <h4 className="mb-3">
        Create Maintenance Bill
      </h4>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label">
              Resident
            </label>

            <select
              className="form-select"
              name="resident"
              value={formData.resident}
              onChange={handleChange}
              required
            >
              <option value="">Select Resident</option>

              {residents.map((resident) => (
                <option
                  key={resident._id}
                  value={resident._id}
                >
                  {resident.name} ({resident.flatNumber})
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              Amount
            </label>

            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              Month
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="July 2026"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              Due Date
            </label>

            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Create Bill
        </button>

      </form>

    </div>
  );
};

export default MaintenanceForm;