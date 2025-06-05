import { RxExternalLink } from "react-icons/rx";
// const results = [1, 2, 3];
import bell from "@/assets/images/no-notifications-empty-state.png";
import { Button } from "@/components/ui/button";
const Notifications = ({setActiveTab}: any) => {
  return (
    <div>
      <div className="flex justify-between md:items-center mb-4 md:px-4">
        <h2 className="font-clash font-semibold text-[20px]">Notifications</h2>

        <div>
          <p className="text-md font-clash font-semibold ">Your User ID</p>
          <p>3948774</p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 mb-10">
        <div className="lg:w-[60%] min-h-[370px] bg-white xl:p-10 py-6 px-2 rounded-3xl">
          {/* <div className="flex flex-col gap-4 text-sm ">
            {results.map((index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h3 className="font-clash font-semibold">
                  You have an update on your shipment to Lagos
                </h3>
                <p>
                  <span className="text-neutral500 mr-2">2h ago</span>
                  <span>#3848774</span>
                </p>
                <div className="px-4 py-1 flex md:flex-row flex-col md:justify-between bg-purple300 border-l-3 border-l-purple500 rounded">
                  <p className="text-neutral600">Parcel have been collected and is on its way to the destination</p>
                  <p className="text-purple500 underline underline-offset-2">View</p>
                </div>
              </div>
            ))}
          </div> */}
          <div className="flex flex-col justify-center items-center ">
            <img src={bell} alt="bell" className="w-[200px]" />
            <p className="font-clash font-semibold text-md my-6">
              You have no notifications yet!
            </p>
            <p className="text-neutral600 text-sm mb-1">
              Looks like you're all caught up.
            </p>
            <p className="text-neutral600 text-sm mb-1">
              Check back later for new notifications
            </p>
            <hr className="border border-neutral200 my-8 w-full" />

            <p className="text-neutral600 text-sm mb-4">
              Ready to send something special or track a delivery?
            </p>
              <Button onClick={()=>setActiveTab('overview')}>Book a delivery</Button>
          </div>
        </div>
        <div className="lg:w-[40%] bg-white xl:p-10 py-6 px-2 rounded-3xl">
          <h3 className="text-md font-clash font-semibold">Customer Support</h3>
          <p className="my-6 text-sm text-neutral600">
            Need help with your shipment, costing or anything at all?
          </p>

          <div className="mb-4">
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Browse our FAQs</span>
            </button>
          </div>
          <div>
            <button className="flex items-center gap-2 font-medium bg-black border border-neutral300 rounded-full px-4 py-3 outline-neutral300">
              <RxExternalLink className="text-white text-xl" />
              <span className="text-white">Contact our support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
