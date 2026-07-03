import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h4 className="text-center mb-4">
        Dashboard
      </h4>

      <ul className="nav flex-column">

        {/* Admin Links */}

        {user?.role === "admin" && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin/dashboard"
                className="nav-link text-white"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/notice"
                className="nav-link text-white"
              >
                Notices
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/complaint"
                className="nav-link text-white"
              >
                Complaints
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/maintenance"
                className="nav-link text-white"
              >
                Maintenance
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link text-white"
              >
                Profile
              </NavLink>
            </li>
          </>
        )}

        {/* Resident Links */}

        {user?.role === "resident" && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/resident/dashboard"
                className="nav-link text-white"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/notice"
                className="nav-link text-white"
              >
                Notices
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/complaint"
                className="nav-link text-white"
              >
                My Complaints
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink
                to="/maintenance"
                className="nav-link text-white"
              >
                My Maintenance
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link text-white"
              >
                Profile
              </NavLink>
            </li>
          </>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;