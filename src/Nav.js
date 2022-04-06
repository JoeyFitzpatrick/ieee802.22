import React from "react";

const Nav = ({ startAlgorithm, changeEnvironment }) => {
  return (
    <nav>
      <h3>Strategic Channel Access in IEEE 802.22 Networks</h3>
      <button
        type="button"
        style={{margin: "1%"}}
        className="btn btn-primary"
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Reset Network
      </button>
      <button
        type="button"
        style={{margin: "1%"}}
        className="btn btn-primary"
        onClick={startAlgorithm}
      >
        Start Algorithm
      </button>
      <button
        type="button"
        style={{margin: "1%"}}
        className="btn btn-primary"
        onClick={changeEnvironment}
      >
        Change Environment
      </button>
    </nav>
  );
};

export default Nav;
