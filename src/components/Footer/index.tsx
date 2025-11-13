import logo from "@/assets/images/gosendeet-black-logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-orange-50 xl:px-30 md:px-20 px-6 py-20 flex lg:flex-row lg:justify-between flex-col gap-8">
      <div className="xl:w-1/3 lg:w-1/2">
        <img src={logo} alt="logo" className="mb-6 h-[36px]" />
        <div className="flex lg:flex-row flex-col gap-4">
          <a href="/" className="font-medium">
            How it works
          </a>
          <a href="/" className="font-medium">
            Compare Rates
          </a>
          <a href="/" className="font-medium">
            Contact Us
          </a>
        </div>
      </div>
      <div className="xl:w-1/3 lg:w-1/2 flex flex-col gap-4">
        <p className="font-clash font-semibold text-[18px] leading-[140%]">
          Be the first to know about exclusive offers, new services, couriers,
          tools and more!
        </p>
        <form action="" className="flex gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="py-2 px-4 text-sm w-full border border-neutral300 rounded-full bg-white"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="md:px-6 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/40">
              Subscribe{" "}
            </button>
          </motion.div>
        </form>
        <p className="font-medium">
          © {currentYear} GoSendeet. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
