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
        </Routes>
    </Router>
  );
}

export default App;