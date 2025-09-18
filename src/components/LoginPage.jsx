import React, { use, useEffect } from "react";
import { CardDemo as LoginCard } from "./ui/LoginCard";

const LoginPage = () => {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <LoginCard />
      </div>
    </>
  );
};

export default LoginPage;
