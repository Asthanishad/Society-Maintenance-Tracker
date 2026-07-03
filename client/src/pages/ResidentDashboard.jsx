import { useEffect, useState } from "react";
import ResidentLayout from "../layouts/ResidentLayout";
import api from "../services/api";

const ResidentDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/resident");
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ResidentLayout>
        <h3>Loading Dashboard...</h3>
      </ResidentLayout>
    );
  }

  return (
    <ResidentLayout>
      <h2 className="page-title">Resident Dashboard</h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h5>My Complaints</h5>
          <h2>{dashboard.myComplaints}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Pending Maintenance</h5>
          <h2>{dashboard.pendingMaintenance}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Overdue Maintenance</h5>
          <h2>{dashboard.overdueMaintenance}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Paid Maintenance</h5>
          <h2>{dashboard.paidMaintenance}</h2>
        </div>

      </div>

      <div className="table-container mt-4">

        <h4 className="mb-3">
          Latest Notices
        </h4>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>

            {dashboard.latestNotices.length > 0 ? (
              dashboard.latestNotices.map((notice) => (
                <tr key={notice._id}>
                  <td>{notice.title}</td>
                  <td>{notice.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No Notices Available
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </ResidentLayout>
  );
};

export default ResidentDashboard;