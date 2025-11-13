const Header = () => {
  return (
    <>
      <div className="h-[90vh] bg-about md:px-20 px-6 py-20">
        <div className="h-full flex flex-col justify-end items-end">
          <div className="flex lg:flex-row flex-col lg:justify-between gap-8 items-center">
            <h1 className="lg:w-[45%] font-clash xl:text-[46px] lg:text-[40px] text-[30px] font-semibold leading-[130%]">
              About{" "}
              <span className="font-tiempos font-normal italic">GoSendeet</span>
            </h1>
            <p className="lg:w-[55%] leading-[140%] lg:text-left font-medium text-center">
              Our journey began with a simple idea: the frustration of juggling
              multiple delivery apps, Gosendeet was created to streamline the
              shipping experience. Our founders envisioned a platform where all
              shipment and delivery organizations come together, so you can
              compare options, view prices, and book services without ever
              leaving one dashboard.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:px-40 md:px-20 px-6 py-20 white bg-neutral-50">
        <p className="font-clash lg:text-[36px] text-2xl font-medium leading-[130%] text-center">
          Gosendeet is more than just a tracking tool. We’ve built a one-stop
          hub that connects you with a vast array of shipment and delivery
          providers. Simply input and filter your shipment details to receive a
          curated list of available services, complete with pricing information.
          Whether you need to book a shipment or monitor its progress,
          everything is available in one place.
        </p>
      </div>
    </>
  );
};

export default Header;
