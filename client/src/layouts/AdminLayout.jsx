import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div
          className="flex-grow-1 p-4"
          style={{
            background: "#f5f7fb",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
};

export default AdminLayout;