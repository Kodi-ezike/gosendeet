import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/home/About";
import CostCalculator from "./pages/home/CostCalculator";
import FAQ from "./pages/home/FAQ";
import Track from "./pages/home/Track";
import Delivery from "./pages/home/CostCalculator/components/Calculator/Booking/Delivery";
import Checkout from "./pages/home/CostCalculator/components/Calculator/Booking/Checkout";
import Confirmation from "./pages/home/CostCalculator/components/Calculator/Booking/Confirmation";
import Tracking from "./pages/home/Track/Tracking";
import Signin from "./pages/auth/Signin";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
        <Routes>         
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/track" element={<Track />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/track/:id" element={<Tracking />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/:id/verify-email" element={<VerifyEmail />} />
          <Route path="/:id/reset-password" element={<ResetPassword />} />

          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
    </Router>
  );
}

export default App;