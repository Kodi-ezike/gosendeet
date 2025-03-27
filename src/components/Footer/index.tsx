import logo from "@/assets/images/gosendeet-black-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-purple300 md:px-20 px-6 py-20 flex lg:flex-row lg:justify-between flex-col gap-8">
      <div className="xl:w-1/3 lg:w-1/2">
        <img src={logo} alt="logo" className="mb-6 h-[40px]" />
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
          <button className="bg-purple400 font-medium rounded-full md:px-6 px-4 py-3 outline-0 text-white text-sm">
            Subscribe
          </button>
        </form>
        <p className="font-medium">© {currentYear} GoSendeet. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
