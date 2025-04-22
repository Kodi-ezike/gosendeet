
const OrderHistory = () => {
  return (
    <div className="md:text-base text-sm">
      <div className="flex gap-4 py-4">
        <div className="flex flex-col gap-1 justify-center items-center">
            <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
            <p className="flex-1 w-[1.5px] bg-green500/50"></p>
        </div>
        <div>
          <h4 className="font-semibold font-clash mb-1">On the way</h4>
          <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
          <p className="text-neutral600 mb-2">
            Parcel is on the way to its destination
          </p>
        </div>
      </div>

      <div className="flex gap-4 py-4">
        <div className="flex flex-col gap-1 justify-center items-center">
            <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
            <p className="flex-1 w-[1.5px] bg-green500/50"></p>
        </div>
        <div>
          <h4 className="font-semibold font-clash mb-1">Received by Logistic Company</h4>
          <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
          <p className="text-neutral600 mb-2">
          Package picked and journey has started to delivery to your customer
          </p>
        </div>
      </div>

      <div className="flex gap-4 py-4">
        <div className="flex flex-col gap-1 justify-center items-center">
            <p className="w-[10px] h-[10px] rounded-full bg-neutral300"></p>
            <p className="flex-1 w-[1.5px] bg-neutral300/50"></p>
        </div>
        <div>
          <h4 className="font-semibold font-clash mb-1">Pickup request accepted</h4>
          <p className="text-neutral500 mb-1">11:37 PM, 27 May 2023 </p>
          <p className="text-neutral600 mb-2">
          Our delivery guy is on the way to pickup your package
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
