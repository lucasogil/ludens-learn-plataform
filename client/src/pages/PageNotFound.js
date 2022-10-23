import React from "react";
import { Link } from "react-router-dom";

function PageNotfound() {
  return (
    <div>
      <h1>Page Not found</h1>
      <h3>
        Go to the Home Page: <Link to="/"> Home Page </Link>
      </h3>
    </div>
  );
}

export default PageNotfound;
