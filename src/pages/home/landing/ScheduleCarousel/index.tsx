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
    <div className="bg-neutral100 md:px-20 px-6 py-10">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="xl:w-[60%] mx-auto"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-clash font-semibold xl:text-3xl text-2xl w-[88%]">
                  Schedule a pickup/delivery
                </h2>
                <p className="w-[40px] h-[40px] rounded-full bg-purple100 flex justify-center items-center">
                  <img src={deliveryIcon} alt="deliveryIcon" />
                </p>
              </div>
              <p className="font-medium">
                Pair with the preferred logistics that works for your package
              </p>
              <button className="w-fit bg-black rounded-full px-8 py-4 mb-4 outline-black text-white">
                Make a delivery
              </button>
              <img src={delivery} alt="delivery" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-clash font-semibold xl:text-3xl text-2xl w-[88%]">
                  Make payment and get started
                </h2>
                <p className="w-[40px] h-[40px] rounded-full bg-blue500 flex justify-center items-center">
                  <img src={paymentIcon} alt="paymentIcon" />
                </p>
              </div>
              <p className="font-medium">
                Hand over your parcel to the delivery service and conveniently
                monitor its progress
              </p>
              <button className="w-fit bg-black rounded-full px-8 py-4 mb-4 outline-black text-white">
                Make a delivery
              </button>
              <img src={payment} alt="payment" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col justify-center items-center text-center gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-clash font-semibold xl:text-3xl text-2xl w-[88%]">
                  Receive your package
                </h2>
                <p className="w-[40px] h-[40px] rounded-full bg-orange100 flex justify-center items-center">
                  <img src={receiveIcon} alt="receiveIcon" />
                </p>
              </div>
              <p className="font-medium">
                You or your receiver will receive the package in due time
              </p>
              <button className="w-fit bg-black rounded-full px-8 py-4 mb-4 outline-black text-white">
                Make a delivery
              </button>
              <img src={receive} alt="receive" />
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
