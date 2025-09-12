import React, { use, useEffect } from "react";
import { CardDemo as LoginCard } from "./ui/LoginCard";
// import AuthCtx from "../context/authCtx";

const LoginPage = () => {
  //   const authCtx = use(AuthCtx);

  //   useEffect(() => {
  //     console.warn(authCtx.access);
  //     console.warn(authCtx.role);
  //   }, []);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <LoginCard />
      </div>
    </>
  );
};

export default LoginPage;
