import React from "react";

const Nav = ({ startAlgorithm }) => {
  return (
    <nav>
      <h3>Strategic Channel Access in IEEE 802.22 Networks</h3>
      <button type="button" className="btn btn-primary">
        Login
      </button>
      <button type="button" className="btn btn-primary">
        Logout
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Reset Network
      </button>
      <button type="button" 
      className="btn btn-primary"
      onClick={startAlgorithm}
      >
        Start Algorithm
      </button>

    </nav>
  );
};

export default Nav;
