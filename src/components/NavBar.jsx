import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top " style={{height: "80px", backgroundColor: "white"}}>
      <div className="container ">
        <a className="navbar-brand" href="#">
          Antony <span className="logo-span">Gakuru</span>
        </a>
        <button
          className="navbar-toggler bg-light text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end " id="navbarNav" style={{backgroundColor: "white"}}>
          <ul className="navbar-nav align-items-center gap-4 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
