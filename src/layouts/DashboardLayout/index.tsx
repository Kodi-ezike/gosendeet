import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardFooter from "@/components/DashboardFooter";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <header>
        <DashboardNavbar />
      </header>
      <main><Outlet/></main>
      <footer>
        <DashboardFooter />
      </footer>
    </div>
  );
};

export default DashboardLayout;
