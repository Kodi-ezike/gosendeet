import phone from "@/assets/images/phone-delivery.png";
import box from "@/assets/images/logistics-box.png";
import close from "@/assets/images/close-delivery.png";
import { LuFileCheck } from "react-icons/lu";
import { SiPrivatedivision } from "react-icons/si";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

const Mission = () => {
  return (
    <div className="md:px-20 px-6 py-10">
      <div className="flex lg:flex-row flex-col lg:gap-4 gap-8 justify-between items-center mb-8">
        <div className="lg:w-1/2">
          <p className="flex items-center gap-2 rounded-full font-clash font-semibold bg-orange-50 text-orange500 w-fit px-4 py-2 mb-6 text-[18px] leading-[140%]">
          
            <LuFileCheck size={18}/>
            <span>Our Mission</span>
          </p>
          <p className="leading-[140%] lg:w-[90%]">
            We simplify the logistics process by unifying all shipment-related
            services under a single, user-friendly platform. We aim to empower
            you with the tools needed to make informed decisions quickly, saving
            you time and reducing the complexity of managing multiple delivery
            apps.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src={box} alt="box" />
        </div>
      </div>
      <div className="flex lg:flex-row-reverse flex-col lg:gap-4 gap-8 justify-between items-center">
        <div className="lg:w-1/2">
          <p className="flex items-center gap-2 rounded-full font-clash font-semibold bg-orange-50 text-orange500 w-fit px-4 py-2 mb-6 text-[18px] leading-[140%]">
            <SiPrivatedivision />

            <span>Our Vision</span>
          </p>
          <p className="leading-[140%] lg:w-[90%]">
            We envision a future where shipping is effortless and accessible. At
            Gosendeet, we are dedicated to revolutionizing the way you interact
            with delivery services—making it a seamless, transparent, and
            efficient experience that connects you with trusted providers at the
            click of a button.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img src={close} alt="close" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:gap-8 gap-6 py-20">
        <div className="text-center bg-orange-50 lg:p-12 p-4 rounded-3xl">
          <FaCircleCheck size={40} className="text-orange500 mx-auto mb-3"/>
          <p className="text-[18px] leading-[140%] font-semibold font-clash mb-2">
            Wide Range of Courier Service
          </p>
          <p className="leading-[140%] text-neutral600">
            We serve as the bridge connecting you with reputable shipment and
            delivery organizations.
          </p>
        </div>
        <div className="text-center bg-orange-50 lg:p-12 p-4 rounded-3xl">
          <FaCircleCheck size={40} className="text-orange500 mx-auto mb-3"/>
          <p className="text-[18px] leading-[140%] font-semibold font-clash mb-2">
            Competitive Price at a View{" "}
          </p>
          <p className="leading-[140%] text-neutral600">
            Instantly compare rates across multiple delivery providers to ensure
            you always get the best deal.
          </p>
        </div>
        <div className="text-center bg-orange-50 lg:p-12 p-4 rounded-3xl">
          <FaCircleCheck size={40} className="text-orange500 mx-auto mb-3"/>
          <p className="text-[18px] leading-[140%] font-semibold font-clash mb-2">
            No More Multiple Registrations
          </p>
          <p className="leading-[140%] text-neutral600">
            Say goodbye to the hassle of creating and maintaining several
            accounts.
          </p>
        </div>
        <div className="text-center bg-orange-50 lg:p-12 p-4 rounded-3xl">
          <FaCircleCheck size={40} className="text-orange500 mx-auto mb-3"/>
          <p className="text-[18px] leading-[140%] font-semibold font-clash mb-2">
            All-in-One Convenience
          </p>
          <p className="leading-[140%] text-neutral600">
            Manage tracking, price comparisons, and bookings from one
            centralized dashboard.
          </p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-8 justify-between">
        <div className="lg:w-1/2">
          <img src={phone} alt="phone" />
        </div>
        <div className="lg:w-1/2 min-h-full p-8 bg-orange-50 flex flex-col justify-center rounded-3xl">
          <p className=" font-clash font-semibold mb-2 md:text-[32px] text-2xl leading-[130%]">
            We are committed to
          </p>
          <p className="leading-[140%]">
            Transforming your shipment experience by bringing all the delivery
            services you need into one easy-to-use platform. Join us as we
            simplify logistics and help you focus on what truly matters.
          </p>
        
          <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="px-10 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/40">
Get started now          </button>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
