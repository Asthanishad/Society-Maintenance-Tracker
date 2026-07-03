import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import AdminLayout from "../layouts/AdminLayout";
import ResidentLayout from "../layouts/ResidentLayout";

import MaintenanceForm from "../components/MaintenanceForm";
import MaintenanceTable from "../components/MaintenanceTable";

const Maintenance = () => {
  const { user } = useAuth();

  const [maintenance, setMaintenance] = useState([]);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenance();

    if (user.role === "admin") {
      fetchResidents();
    }
  }, []);

  const fetchMaintenance = async () => {
    try {
      const url =
        user.role === "admin"
          ? "/maintenance/all"
          : "/maintenance/my";

      const { data } = await api.get(url);

      setMaintenance(data.maintenance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResidents = async () => {
    try {
      const { data } = await api.get("/auth/residents");
      setResidents(data.residents);
    } catch (error) {
      console.log(error);
    }
  };

  const createBill = async (formData) => {
    try {
      await api.post("/maintenance/create", formData);

      alert("Maintenance Bill Created");

      fetchMaintenance();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to create bill"
      );

    }
  };

  const payBill = async (id) => {
    try {

      await api.put(`/maintenance/pay/${id}`);

      alert("Payment Successful");

      fetchMaintenance();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to pay bill"
      );

    }
  };

  const deleteBill = async (id) => {
    if (!window.confirm("Delete this bill?")) return;

    try {

      await api.delete(`/maintenance/delete/${id}`);

      alert("Bill Deleted");

      fetchMaintenance();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to delete bill"
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
        Maintenance Management
      </h2>

      {user.role === "admin" && (
        <MaintenanceForm
          residents={residents}
          onCreate={createBill}
        />
      )}

      <MaintenanceTable
        maintenance={maintenance}
        userRole={user.role}
        onPay={payBill}
        onDelete={deleteBill}
      />

    </Layout>
  );
};

export default Maintenance;