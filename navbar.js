import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li>
            <img
              src="https://logos-world.net/wp-content/uploads/2021/02/Google-Analytics-Logo.png"
              alt="Google Analytics Logo"
              height="40"
              width="80"
            />
          </li>
          <li>
            <Link to="/Users">Users</Link>
          </li>
          <li>
            <Link to="/CreateUser">Signup</Link>
          </li>
          <li>
            <Link to="/LoginUser">Login</Link>
          </li>
          <li>
            <Link to="/ProductList">Products</Link>
          </li>
          <li>
            <Link to="/Orders">Orders</Link>
          </li>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/SuppliersList">Suppliers</Link>
          </li>
          <li>
            <Link to="/R&A">R&A</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
