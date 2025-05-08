import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardFooter from "@/components/DashboardFooter";
import { LayoutProps } from "@/lib/types";

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <DashboardNavbar />
      </header>
      <main>{children}</main>
      <footer>
        <DashboardFooter />
      </footer>
    </div>
  );
};

export default DashboardLayout;
