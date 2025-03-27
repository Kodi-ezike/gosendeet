import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU } from "../../constants";
import logo from "@/assets/images/gosendeet-logo.png";
import { HiBars3 } from "react-icons/hi2";
import { GoX } from "react-icons/go";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const location = useLocation(); // Get current location

  return (
    <nav className="w-full z-10">
      <div className="flex justify-between items-center lg:py-5 py-6 xl:px-36 md:px-20 px-6 bg-white border-b border-b-neutral-300">
        {/* Logo or Brand Name */}
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="" />
          </Link>
        </div>

        {/* Hamburger Icon (mobile view) */}
        <div className="lg:hidden flex items-center gap-4">
        <Link to="/login">
            <button className="bg-neutral200  hover:bg-black hover:text-white border border-darkGreen px-5 py-2 text-black rounded-3xl">
            Log In
            </button>
          </Link>
          <button onClick={handleNavToggle}>
            <HiBars3 size={24} />
          </button>
        </div>

        {/* Links (desktop view) */}
        <ul className="hidden lg:flex xl:space-x-16 lg:space-x-6">
          {MENU.map((link, index) => {
            const isActive = link.route === location.pathname;
            return (
              <li
                key={index}
                className=" text-center rounded-3xl cursor-pointer"
              >
                <Link
                  to={link.route}
                  className={`block py-2 text-neutral600 hover:border-b-2 hover:border-darkGreen  ${
                    isActive ? "border-b-2 border-darkGreen" : ""
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
         
        </ul>

        <div className="hidden lg:flex lg:flex-row gap-8 flex-col">
        <Link to="/login">
            <button className="bg-black hover:bg-white hover:text-black border px-5 py-2 text-white rounded-3xl">
            Sign Up
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-neutral200  hover:bg-black hover:text-white border border-darkGreen px-5 py-2 text-black rounded-3xl">
            Log In
            </button>
          </Link>
        </div>

        {/* Links (mobile view) */}
        <div
          className={`lg:hidden absolute top-0 left-0 w-full h-[80vh] bg-white py-6 md:px-20 px-10 transition-transform duration-300 ${
            navOpen ? "transform translate-x-0" : "transform -translate-x-full"
          }`}
        >
          <div className="flex justify-between">
            <p>MENU</p>

            <button onClick={handleNavToggle}>
              <GoX size={26} />
            </button>
          </div>

          <ul className="flex flex-col my-[3rem]">
            {MENU.map((link, index) => {
              const isActive = link.route === location.pathname;
              return (
                <Link
                  to={link.route}
                  className="hover:text-gray-300 my-3 w-[80%]"
                  key={index}
                >
                  <li
                    className={` w-full  hover:bg-white hover:text-green cursor-pointer ${
                      isActive ? " text-green " : ""
                    }`}
                  >
                    {link.title}
                  </li>
                </Link>
              );
            })}
          </ul>
          <a href="/login">
            <button className="border-2 w-full font-semibold hover:bg-green-900 px-4 py-4 text-white bg-black rounded mb-4">
            Sign Up
            </button>
          </a>

          <a href="/login">
            <button className="border-2 w-full font-semibold hover:bg-green-900 px-4 py-4 text-black bg-white rounded">
              Log In
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
