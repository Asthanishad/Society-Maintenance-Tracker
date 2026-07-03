import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import ResidentLayout from "../layouts/ResidentLayout";

const Profile = () => {
  const { user } = useAuth();

  const Layout =
    user?.role === "admin"
      ? AdminLayout
      : ResidentLayout;

  return (
    <Layout>
      <h2 className="page-title">My Profile</h2>

      <div className="card p-4">

        <h4>{user?.name}</h4>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>

        <p>
          <strong>Flat:</strong> {user?.flatNumber}
        </p>

        <p>
          <strong>Role:</strong> {user?.role}
        </p>

      </div>
    </Layout>
  );
};

export default Profile;