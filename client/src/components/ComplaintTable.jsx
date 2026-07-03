const ComplaintTable = ({
  complaints,
  userRole,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div className="table-container">

      <h4 className="mb-3">
        Complaint List
      </h4>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Title</th>

            <th>Description</th>

            <th>Status</th>

            <th>Image</th>

            {userRole === "admin" && (
              <th>Actions</th>
            )}

          </tr>

        </thead>

        <tbody>

          {complaints.length > 0 ? (
            complaints.map((item) => (

              <tr key={item._id}>

                <td>{item.title}</td>

                <td>{item.description}</td>

                <td>{item.status}</td>

                <td>

                  {item.image ? (
                    <a
                      href={`http://localhost:5000/${item.image}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No Image"
                  )}

                </td>

                {userRole === "admin" && (

                  <td>

                    <select
                      className="form-select mb-2"
                      defaultValue={item.status}
                      onChange={(e) =>
                        onStatusChange(
                          item._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Pending</option>

                      <option>In Progress</option>

                      <option>Resolved</option>

                    </select>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        onDelete(item._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                )}

              </tr>

            ))
          ) : (

            <tr>

              <td
                colSpan={
                  userRole === "admin"
                    ? 5
                    : 4
                }
                className="text-center"
              >
                No Complaints Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default ComplaintTable;