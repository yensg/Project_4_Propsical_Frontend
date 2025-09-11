import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthCtx from "./context/authCtx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Calendar from "./components/Calendar";

const queryClient = new QueryClient();

function App() {
  const [access, setAccess] = useState("");
  const [role, setRole] = useState("");
  return (
    <>
      <AuthCtx.Provider value={{ access, setAccess, role, setRole }}>
        <QueryClientProvider client={queryClient}>
          <nav className="fixed top-4 left-4 z-50">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <Link to="/">Login</Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <Link to="/calendar">Calendar</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </QueryClientProvider>
      </AuthCtx.Provider>
    </>
  );
}

export default App;
