const NoticeTable = ({ notices, userRole, onDelete }) => {
  return (
    <div className="table-container">

      <h4 className="mb-3">All Notices</h4>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Pinned</th>
            {userRole === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>

          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice._id}>

                <td>{notice.title}</td>

                <td>{notice.description}</td>

                <td>
                  {notice.isPinned ? "📌 Yes" : "No"}
                </td>

                {userRole === "admin" && (
                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(notice._id)}
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
                colSpan={userRole === "admin" ? 4 : 3}
                className="text-center"
              >
                No Notices Found
              </td>

            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
};

export default NoticeTable;