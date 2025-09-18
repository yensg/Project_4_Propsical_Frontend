import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthCtx from "./context/authCtx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import ListingSummary from "./components/ListingSummary";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import LogoutPage from "./components/LogoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ListingEachPage from "./components/ListingEachPage";
import ListingEachCreate from "./components/ListingEachCreate";
import ListingEachUpload from "./components/ListingEachUpload";
import ListingEachUpdate from "./components/ListingEachUpdate";
import ListingPublicPage from "./components/ListingPublicPage";
import { House, LayoutList, LogIn, LogOut } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  const [access, setAccess] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [account_id, setAccount_id] = useState("");
  const isAuthenticated = Boolean(access);
  return (
    <>
      <AuthCtx.Provider
        value={{
          access,
          setAccess,
          role,
          setRole,
          username,
          setUsername,
          account_id,
          setAccount_id,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <nav
            className="fixed bottom-0 md:bottom-auto md:top-0 left-0 right-0 h-15 z-50 w-full
                border-t md:border-t-0 md:border-b bg-background [&_svg]:w-10 [&_svg]:h-10"
          >
            <NavigationMenu
              viewport={false}
              className="!w-full !max-w-none flex-1 md:flex-none md:!w-auto md:!justify-start"
            >
              <NavigationMenuList className="grid w-full grid-cols-2 justify-items-center md:flex md:w-auto md:justify-start md:gap-4 !space-x-0 p-0 m-0">
                {/* <NavigationMenuList className="flex w-full justify-evenly items-center md:flex md:w-auto md:justify-start md:gap-4 !space-x-0 p-0 m-0"> */}
                {!isAuthenticated ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/main">
                        <House
                          className="!w-8 !h-8 text-black"
                          strokeWidth={1.4}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/listings">
                        <LayoutList
                          className="!w-8 !h-8 text-black"
                          strokeWidth={1.4}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
                {/* <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="block px-3 py-2 hover:bg-accent rounded-md"
                  >
                    <Link to="/calendar/:id">
                      <CalendarDays
                        className="!w-8 !h-8 text-black"
                        strokeWidth={1.4}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}

                {!isAuthenticated ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/login">
                        <LogIn
                          className="!w-8 !h-8 text-black"
                          strokeWidth={1.4}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 hover:bg-accent rounded-md"
                    >
                      <Link to="/logout">
                        <LogOut
                          className="!w-8 !h-8 text-black"
                          strokeWidth={1.4}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <main className="pb-16 md:pb-0 md:pt-14">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/main" element={<ListingPublicPage />} />
              <Route path="/calendar/:id" element={<Calendar />} />
              <Route
                path="/newListingUpload/:id"
                element={
                  <ProtectedRoute>
                    <ListingEachUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/newListing/"
                element={
                  <ProtectedRoute>
                    <ListingEachCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateListing/:id"
                element={
                  <ProtectedRoute>
                    <ListingEachUpdate />
                  </ProtectedRoute>
                }
              />
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
          </main>
        </QueryClientProvider>
      </AuthCtx.Provider>
    </>
  );
}

export default App;
