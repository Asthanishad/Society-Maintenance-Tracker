import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/admin");
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h3>Loading Dashboard...</h3>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="page-title">Admin Dashboard</h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h5>Total Residents</h5>
          <h2>{dashboard.totalResidents}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Total Complaints</h5>
          <h2>{dashboard.totalComplaints}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Pending Complaints</h5>
          <h2>{dashboard.pendingComplaints}</h2>
        </div>

        <div className="dashboard-card">
          <h5>Resolved Complaints</h5>
          <h2>{dashboard.resolvedComplaints}</h2>
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

        <div className="dashboard-card">
          <h5>Total Collection</h5>
          <h2>₹ {dashboard.totalCollection}</h2>
        </div>

      </div>

      <div className="table-container mt-4">

        <h4 className="mb-3">
          Recent Complaints
        </h4>

        <table className="table table-bordered table-hover">

          <thead>

            <tr>
              <th>Resident</th>
              <th>Flat</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {dashboard.recentComplaints.length > 0 ? (
              dashboard.recentComplaints.map((item) => (
                <tr key={item._id}>
                  <td>{item.resident?.name}</td>
                  <td>{item.resident?.flatNumber}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No Complaints
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <div className="table-container mt-4">

        <h4 className="mb-3">
          Recent Notices
        </h4>

        <table className="table table-bordered table-hover">

          <thead>

            <tr>
              <th>Title</th>
              <th>Created By</th>
            </tr>

          </thead>

          <tbody>

            {dashboard.recentNotices.length > 0 ? (
              dashboard.recentNotices.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.createdBy?.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No Notices
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;