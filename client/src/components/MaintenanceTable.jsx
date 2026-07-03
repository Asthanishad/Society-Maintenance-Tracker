const MaintenanceTable = ({
  maintenance,
  userRole,
  onPay,
  onDelete,
}) => {
  return (
    <div className="table-container">

      <h4 className="mb-3">
        Maintenance Bills
      </h4>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>Month</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Due Date</th>

            <th>Payment Date</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {maintenance.length > 0 ? (

            maintenance.map((bill) => (

              <tr key={bill._id}>

                <td>{bill.month}</td>

                <td>₹ {bill.amount}</td>

                <td>

                  <span
                    className={
                      bill.status === "Paid"
                        ? "badge bg-success"
                        : bill.status === "Overdue"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {bill.status}
                  </span>

                </td>

                <td>
                  {new Date(
                    bill.dueDate
                  ).toLocaleDateString()}
                </td>

                <td>

                  {bill.paymentDate
                    ? new Date(
                        bill.paymentDate
                      ).toLocaleDateString()
                    : "-"}

                </td>

                <td>

                  {userRole === "resident" &&
                  bill.status !== "Paid" ? (

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        onPay(bill._id)
                      }
                    >
                      Pay
                    </button>

                  ) : null}

                  {userRole === "admin" && (

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        onDelete(bill._id)
                      }
                    >
                      Delete
                    </button>

                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center"
              >
                No Maintenance Bills Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default MaintenanceTable;