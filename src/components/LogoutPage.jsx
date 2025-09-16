import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthCtx from "../context/authCtx";

const LogoutPage = () => {
  const authCtx = use(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.removeItem("refresh");
    authCtx.setAccess("");
    authCtx.setRole("");
    authCtx.setUsername("");
    authCtx.setAccount_id("");
    navigate("/login");
    // to empty all states and contexts for next user
    window.location.reload(true);
  }, []);

  return <div></div>;
};

export default LogoutPage;
