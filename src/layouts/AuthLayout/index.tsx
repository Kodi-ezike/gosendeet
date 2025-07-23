import Navbar from "@/components/Navbar";
import { LayoutProps } from "@/lib/types";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AuthLayout;
