import Navbar from "@/components/Navbar";
import { LayoutProps } from "@/lib/types";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
