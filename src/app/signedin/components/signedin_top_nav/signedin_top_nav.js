
import { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../../../services/authentication_service";
import { withRouter } from "../../../../common/with_router";
import { Avatar } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import * as FaIcons from "react-icons/fa";
import Sidebar from "../sidebar/sidebar";
import http from "../../../../http-common";

class SignedinTopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      firstLetter: "",
      lowStockCount: 0, // Initialize lowStockCount in state
    };
  }

  componentDidMount() {
    // Retrieve user data from local storage
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData && authData.user && authData.user.username) {
      this.setState({
        firstLetter: authData.user.username.charAt(0).toUpperCase(),
      });
    }

    // Fetch low stock count
    this.fetchLowStockCount();
  }

  fetchLowStockCount = async () => {
    try {
      const response = await http.get("/low-stock-count");
      this.setState({ lowStockCount: response.data.totalLowStockItems });
    } catch (error) {
      console.error("Error fetching low stock count:", error);
    }
  };

  handleLogout = () => {
    AuthenticationService.logout();
    this.props.loggedout();
    this.props.router.navigate("/", { replace: true });
  };

  showSidebar = () => {
    this.setState((prevState) => ({
      sidebar: !prevState.sidebar,
    }));
  };

  render() {
    const { sidebar, firstLetter, lowStockCount } = this.state; // ✅ Destructure lowStockCount

    const { isAdmin, isOperator, isOwner } = this.props;

    return (
      <>
        <Sidebar
          sidebar={sidebar}
          isAdmin={isAdmin}
          isOperator={isOperator}
          isOwner={isOwner}
          toggleSidebar={this.showSidebar}
        />

        <nav className="navbar navbar-expand-lg position-fixed bg-dark text-white fixed-top px-2">
          <div className="container-fluid">
            {/* Sidebar Toggle Button */}
            <Link to="#" className="menu-bars m-1 px-2 pt-0" onClick={this.showSidebar}>
              <FaIcons.FaBars style={{ color: "White" }} />
            </Link>

            {/* Brand Name */}
            <Link to="/" className="navbar-brand text-white fw-bold">
              Kitchen Inventory
            </Link>

            {/* Notifications & Profile Dropdown */}
            <Dropdown>
              <Link to="/low-stock" className="navbar-brand text-white">
                <button type="button"  style={{
                    cursor: "pointer",
                    width: 40,
                    height: 40,
                    
                  }}  className="btn btn-warning  rounded-circle position-relative">
                  <i className="bi bi-bell-fill"></i>
                  {lowStockCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {lowStockCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Profile Avatar */}
              <Dropdown.Toggle className="p-0 rounded-circle bg-white" id="dropdown-custom-components" bsPrefix="custom-dropdown-toggle">
                <Avatar
                  className="rounded-circle border border-2 border-primary bg-primary text-white"
                  style={{
                    cursor: "pointer",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {firstLetter}
                </Avatar>
              </Dropdown.Toggle>

              {/* Dropdown Menu */}
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      </>
    );
  }
}

export default withRouter(SignedinTopNav);

