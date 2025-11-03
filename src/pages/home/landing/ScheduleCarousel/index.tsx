import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import delivery from "@/assets/images/delivery.png";
import payment from "@/assets/images/payment.png";
import receive from "@/assets/images/package.png";
import deliveryIcon from "@/assets/icons/mdi_home-schedule.png";
import paymentIcon from "@/assets/icons/mdi_stopwatch-start-outline.png";
import receiveIcon from "@/assets/icons/receive.png";

const CarouselPage = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  return (
    <div className="bg-gradient-to-b from-neutral100/50 to-white md:px-20 px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="font-clash xl:text-[56px] lg:text-[48px] text-[40px] font-bold mb-4 text-[#1a1a1a]">
          Simple <span className="gradient-text">Process</span>
        </h2>
        <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-xl lg:text-lg text-base">
          From booking to delivery in three easy steps
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="xl:w-[70%] lg:w-[80%] mx-auto"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-4 bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple400 to-blue400 flex justify-center items-center shadow-lg">
                  <img src={deliveryIcon} alt="deliveryIcon" className="w-7 h-7" />
                </div>
                <h2 className="font-clash font-bold xl:text-4xl text-3xl text-[#1a1a1a]">
                  Schedule a pickup/delivery
                </h2>
              </div>
              <p className="font-semibold text-[#6b7280] text-lg max-w-xl">
                Pair with the preferred logistics that works for your package
              </p>
              <button className="w-fit bg-gradient-to-r from-purple400 to-blue400 hover:from-purple500 hover:to-blue500 rounded-full px-10 py-4 mb-4 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Make a delivery
              </button>
              <div className="rounded-2xl overflow-hidden border-4 border-purple100 shadow-2xl mt-4">
                <img src={delivery} alt="delivery" className="w-full" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-4 bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue400 to-green400 flex justify-center items-center shadow-lg">
                  <img src={paymentIcon} alt="paymentIcon" className="w-7 h-7" />
                </div>
                <h2 className="font-clash font-bold xl:text-4xl text-3xl text-[#1a1a1a]">
                  Make payment and get started
                </h2>
              </div>
              <p className="font-semibold text-[#6b7280] text-lg max-w-xl">
                Hand over your parcel to the delivery service and conveniently
                monitor its progress
              </p>
              <button className="w-fit bg-gradient-to-r from-blue400 to-green400 hover:from-blue500 hover:to-green500 rounded-full px-10 py-4 mb-4 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Track Delivery
              </button>
              <div className="rounded-2xl overflow-hidden border-4 border-blue100 shadow-2xl mt-4">
                <img src={payment} alt="payment" className="w-full" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-4 bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green400 to-purple400 flex justify-center items-center shadow-lg">
                  <img src={receiveIcon} alt="receiveIcon" className="w-7 h-7" />
                </div>
                <h2 className="font-clash font-bold xl:text-4xl text-3xl text-[#1a1a1a]">
                  Receive your package
                </h2>
              </div>
              <p className="font-semibold text-[#6b7280] text-lg max-w-xl">
                You or your receiver will receive the package in due time
              </p>
              <button className="w-fit bg-gradient-to-r from-green400 to-purple400 hover:from-green500 hover:to-purple500 rounded-full px-10 py-4 mb-4 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Get Started
              </button>
              <div className="rounded-2xl overflow-hidden border-4 border-green100 shadow-2xl mt-4">
                <img src={receive} alt="receive" className="w-full" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default CarouselPage;
