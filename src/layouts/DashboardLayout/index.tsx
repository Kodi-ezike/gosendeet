import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardFooter from "@/components/DashboardFooter";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <DashboardNavbar />
      </header>
      <main className="flex-grow bg-neutral100"><Outlet/></main>
      <footer>
        <DashboardFooter />
      </footer>
    </div>
  );
};

export default DashboardLayout;
