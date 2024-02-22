import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({ logout, user, setUser }) {
  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return (
    <Navbar expand="md" className="navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        Jobly
      </NavLink>
      <Nav className="ml-auto">
        {user ? (
          <>
            <NavItem>
              <NavLink to="/companies" className="nav-link">
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs" className="nav-link">
                Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" className="nav-link" onClick={logout}>
                Log Out: {user}
              </NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
