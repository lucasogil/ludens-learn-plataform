import React, { useContext, useEffect } from "react";
import { withRouter } from "./withRouter";
import { AuthContext } from "./AuthContext";

function Logout(props) {
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      setAuthState({ username: "", id: 0, status: false });
    }
  }, []);

  return props.navigate("/login");
}

export default withRouter(Logout);
