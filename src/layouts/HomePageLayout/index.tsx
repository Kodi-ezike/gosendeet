import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LayoutProps } from "@/lib/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
