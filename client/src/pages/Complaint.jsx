import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import AdminLayout from "../layouts/AdminLayout";
import ResidentLayout from "../layouts/ResidentLayout";

import ComplaintForm from "../components/ComplaintForm";
import ComplaintTable from "../components/ComplaintTable";

const Complaint = () => {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const url =
        user.role === "admin"
          ? "/complaint/all"
          : "/complaint/my";

      const { data } = await api.get(url);

      setComplaints(data.complaints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Create Complaint
  // ==========================
  const createComplaint = async (formData) => {
    try {
      await api.post("/complaint/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Complaint Created Successfully");

      fetchComplaints();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ==========================
  // Update Status (Admin)
  // ==========================
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/complaint/status/${id}`, {
        status,
        note: `Status changed to ${status}`,
      });

      fetchComplaints();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update complaint"
      );
    }
  };

  // ==========================
  // Delete Complaint
  // ==========================
  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      await api.delete(`/complaint/delete/${id}`);

      alert("Complaint Deleted Successfully");

      fetchComplaints();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete complaint"
      );
    }
  };

  const Layout =
    user.role === "admin"
      ? AdminLayout
      : ResidentLayout;

  if (loading) {
    return (
      <Layout>
        <h3>Loading...</h3>
      </Layout>
    );
  }

  return (
    <Layout>

      <h2 className="page-title">
        Complaint Management
      </h2>

      {user.role === "resident" && (
        <ComplaintForm
          onSubmit={createComplaint}
        />
      )}

      <ComplaintTable
        complaints={complaints}
        userRole={user.role}
        onStatusChange={updateStatus}
        onDelete={deleteComplaint}
      />

    </Layout>
  );
};

export default Complaint;