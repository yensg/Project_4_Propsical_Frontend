import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popsicle } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCtx from "../../context/authCtx";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export function CardDemo() {
  const navigate = useNavigate();
  const clickedRegister = () => navigate("/registration");
  const authCtx = use(AuthCtx);
  const fetchData = useFetch();
  const [username, setUsername] = useState("austin");
  const [password, setPassword] = useState("password123");

  const clickedLogin = async () => {
    const data = await fetchData(
      "/auth/login",
      "POST",
      {
        username: username,
        password: password,
      },
      undefined
    );
    try {
      authCtx.setAccess(data?.access);
      const decoded = jwtDecode(data?.access);
      if (decoded) {
        authCtx.setRole(decoded.role);
        authCtx.setUsername(decoded.username);
      }
      navigate("/listings");
    } catch (error) {
      console.error(error.message);
      throw "A login error has occurred";
    }
    return data.access;
  };
  const query = useQuery({
    queryKey: ["login"],
    queryFn: clickedLogin,
    enabled: false,
    retry: false,
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <CardTitle className="flex items-center gap-2">
          <Popsicle className="w-6 h-6" />
          Propsical
        </CardTitle>
        <CardDescription>Login to your account</CardDescription>
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={query.refetch}>
          Login
        </Button>
        <div className="flex w-full gap-4">
          <Button variant="outline" className="flex-1">
            Login with Google
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={clickedRegister}
          >
            Register
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
