import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>To Do Buddy </h1>
        </Link>
        <nav>
          {user ? (
            <div className="header">
              <span className="email-span">{user.email}</span>
              <button className="log-btn" onClick={handleClick}>
                Log out
              </button>
            </div>
          ) : (
            <div>
              <Link className="log-btn" to="/login">
                Log in
              </Link>
              <Link className="log-btn" to="/signup">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
