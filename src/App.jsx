import { useState } from "react";
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
import Calendar from "./components/Calendar";
import ListingSummary from "./components/ListingSummary";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import LogoutPage from "./components/LogoutPage";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ProtectedRoute from "./components/ProtectedRoute";
import ListingEachPage from "./components/ListingEachPage";

const queryClient = new QueryClient();

function App() {
  const [access, setAccess] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const isAuthenticated = Boolean(access);
  return (
    <>
      <AuthCtx.Provider
        value={{ access, setAccess, role, setRole, username, setUsername }}
      >
        <QueryClientProvider client={queryClient}>
          <nav
            className="fixed bottom-0 md:bottom-auto md:top-0 left-0 right-0 z-50 w-full
                border-t md:border-t-0 md:border-b bg-background"
          >
            <NavigationMenu
              viewport={false}
              className="!w-full !max-w-none flex-1 md:flex-none md:!w-auto md:!justify-start"
            >
              <NavigationMenuList className="grid w-full grid-cols-3 justify-items-center md:flex md:w-auto md:justify-start md:gap-4 !space-x-0 p-0 m-0">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="block px-3 py-2 hover:bg-accent rounded-md"
                  >
                    <Link to="/listings">Listings</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="block px-3 py-2 hover:bg-accent rounded-md"
                  >
                    <Link to="/calendar">Calendar</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {!isAuthenticated ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/login">Login</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/logout">Logout</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <br />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/listings/:id" element={<ListingEachPage />} />
            <Route
              path="/listings"
              element={
                <ProtectedRoute>
                  <ListingSummary />
                </ProtectedRoute>
              }
            />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </QueryClientProvider>
      </AuthCtx.Provider>
    </>
  );
}

export default App;
