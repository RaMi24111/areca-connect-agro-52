import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import IndustryRegister from "./pages/IndustryRegister";
import IndustryLogin from "./pages/IndustryLogin";
import FarmerLogin from "./pages/FarmerLogin";
import ArtisanLogin from "./pages/ArtisanLogin";
import UserLogin from "./pages/UserLogin";
import FarmerProfile from "./pages/FarmerProfile";
import ArtisanProfile from "./pages/ArtisanProfile";
import UserProfile from "./pages/UserProfile";
import ArtisanRegister from "./pages/ArtisanRegister";
import IndustryProfile from "./pages/IndustryProfile";
import IndustryProfileView from "./pages/IndustryProfileView";
import FarmerHome from "./pages/FarmerHome";
import ArtisanHome from "./pages/ArtisanHome";
import IndustryHome from "./pages/IndustryHome";
import UserHome from "./pages/UserHome";
import UserCheckout from "./pages/UserCheckout";
import UserOrders from "./pages/UserOrders";
import FarmerDashboard from "./pages/FarmerDashboard";
import ArtisanDashboard from "./pages/ArtisanDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<UserRegister />} />
          <Route path="/register/industry" element={<IndustryRegister />} />
          <Route path="/industry/login" element={<IndustryLogin />} />
          <Route path="/artisan/register" element={<ArtisanRegister />} />
          <Route path="/artisan/profile" element={<ArtisanProfile />} />
          <Route path="/farmer-login" element={<FarmerLogin />} />
          <Route path="/artisan-login" element={<ArtisanLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/artisan/profile" element={<ArtisanProfile />} />
          <Route path="/industry/profile" element={<IndustryProfile />} />
          <Route path="/industry/profile-view" element={<IndustryProfileView />} />
          <Route path="/farmer/home" element={<FarmerHome />} />
          <Route path="/artisan/home" element={<ArtisanHome />} />
          <Route path="/industry/home" element={<IndustryHome />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/checkout" element={<UserCheckout />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
