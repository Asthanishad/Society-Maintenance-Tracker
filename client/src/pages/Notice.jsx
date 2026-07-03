import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import ResidentLayout from "../layouts/ResidentLayout";
import NoticeForm from "../components/NoticeForm";
import NoticeTable from "../components/NoticeTable";

const Notice = () => {
  const { user } = useAuth();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await api.get("/notice/all");
      setNotices(data.notices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createNotice = async (formData) => {
    try {
      await api.post("/notice/create", formData);

      alert("Notice Created Successfully");

      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await api.delete(`/notice/delete/${id}`);

      alert("Notice Deleted Successfully");

      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const Layout =
    user?.role === "admin"
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
        Notice Management
      </h2>

      {user?.role === "admin" && (
        <NoticeForm
          onCreate={createNotice}
        />
      )}

      <NoticeTable
        notices={notices}
        userRole={user?.role}
        onDelete={deleteNotice}
      />

    </Layout>
  );
};

export default Notice;