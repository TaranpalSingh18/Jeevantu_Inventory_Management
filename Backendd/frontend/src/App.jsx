import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/Toaster";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Payments from "./pages/Payments";
import Landing from "./pages/Landing";
import Landingg from "./pages/Landingg";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import CashierLogin from "./pages/Cashierlogin";
import UserLogin from "./pages/Userlogin";
import UserSignup from "./pages/UserSignup";
import CashierDashboard from "./pages/Cashierdashboard";
import Shop from "./pages/Shop";
import MainLayout from "./components/layout/MainLayout";
import { AppProvider, useAppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoutes"; // Import ProtectedRoute

function Router() {
  const { user } = useAppContext();
  const [location] = useLocation();

  // Pages that don't use the MainLayout
  const standalonePages = [
    "/",
    "/auth",  // ✅ Include /auth
    "/admin-login",
    "/cashier-login",
    "/user-signup",
    "/user-login",
    "/shop",
    "/cashier-dashboard"
  ];

  // Determine if current page should use MainLayout
  const useMainLayout = !standalonePages.includes(location);

  // Admin dashboard routes with ProtectedRoute for /dashboard
  const adminRoutes = (
    <>
      <Route path="/dashboard">
        <ProtectedRoute allowedRoles={["admin"]} component={Dashboard} />
      </Route>
      <Route path="/inventory" component={Inventory} />
      <Route path="/sales" component={Sales} />
      <Route path="/payments" component={Payments} />
      <Route path="/reports" component={Reports} />
      <Route path="/settings" component={Settings} />
    </>
  );

  return (
    <Switch>
      <Route path="/" component={Landingg} />
      <Route path="/auth" component={Landing} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/cashier-login" component={CashierLogin} />
      <Route path="/user-login" component={UserLogin} />
      <Route path="/user-signup" component={UserSignup} />
      <Route path="/cashier-dashboard" component={CashierDashboard} />
      <Route path="/shop" component={Shop} />
      {adminRoutes}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  // Pages that don't use the MainLayout
  const standalonePages = [
    "/",
    "/auth",  // ✅ Include /auth
    "/admin-login",
    "/user-signup",
    "/cashier-login",
    "/user-login",
    "/shop",
    "/cashier-dashboard"
  ];

  // Determine if current page should use MainLayout
  const useMainLayout = !standalonePages.includes(location);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        {useMainLayout ? (
          <MainLayout>
            <Router />
          </MainLayout>
        ) : (
          <Router />
        )}
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
