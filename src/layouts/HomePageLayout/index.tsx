"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LayoutProps } from "@/lib/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
