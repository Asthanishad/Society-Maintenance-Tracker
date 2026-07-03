import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
    >
      <h1>404</h1>

      <h3>Page Not Found</h3>

      <Link
        to="/login"
        className="btn btn-primary mt-3"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default NotFound;