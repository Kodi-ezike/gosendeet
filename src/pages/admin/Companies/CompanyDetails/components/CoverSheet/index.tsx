import { BsThreeDotsVertical } from "react-icons/bs";

const CoverSheet = () => {
      const results = [1, 2];

  return (
    <div className="py-4">
      <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold mb-4">
        Basic Details
      </p>

      <div className="bg-white mb-8">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-6 md:p-6 p-4">
          <div>
            <p className="font-medium text-sm mb-2">Phone</p>
            <p className="text-sm">+234 9123456789</p>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Alt Phone</p>
            <p className="text-sm">+234 9123456789</p>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Email</p>
            <p className="text-sm">company@delivery.com</p>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Alt Email</p>
            <p className="text-sm">-</p>
          </div>
        </div>

        <hr />

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-6 md:p-6 p-4">
          <div>
            <p className="font-medium text-sm mb-2">Company Website</p>
            <p className="text-sm">www.dhlogistics.com</p>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Branch Address</p>
            <p className="text-sm">
              2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
            </p>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Services</p>

            <div className="flex gap-4 items-center text-sm font-medium">
              <p className="py-2 px-4 bg-purple200 w-fit">Express</p>
              <p className="py-2 px-4 bg-purple200 w-fit">Standard</p>
            </div>
          </div>
        </div>

        <hr />
      </div>

      <p className="text-neutral800 md:text-[20px] text-sm font-inter font-semibold mb-4">
        Pricing
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[1200px] w-full relative">
          <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple300 w-full">
            <span className="w-[1%] mr-4">
              <input type="checkbox" name="" id="" className="mt-[2px]" />
            </span>
            <span className="flex-1">Service level</span>
            <span className="flex-1">Base Price</span>
            <span className="flex-1">Weight Multiplier</span>
            <span className="flex-1">Zone Multiplier</span>
            <span className="flex-1">% Discount </span>
            <span className="w-[2%]"></span>
          </div>

          {results?.map((index) => {
            return (
              <div
                key={index}
                className={`relative min-h-[60px] bg-white py-2 px-3 xl:px-4 text-sm flex items-center ${
                  index === 0 ? "border-b-0" : "border-b border-b-neutral300"
                } hover:bg-purple300`}
              >
                <span className="w-[1%] mr-4">
                  <input type="checkbox" name="" id="" className="mt-1" />
                </span>
                <div className="flex-1">
                  <p>Express</p>
                </div>
                <div className="flex-1">
                  <p>₦ 100</p>
                </div>
                <div className="flex-1">
                  <p>1.5</p>
                </div>
                <div className="flex-1">
                  <p>1.2</p>
                </div>
                <div className="flex-1">20</div>
                <div className="w-[2%]">
                  <button className="border p-1 rounded-md border-neutral200">
                    <BsThreeDotsVertical
                      size={20}
                      className="p-1 cursor-pointer"
                    //   onClick={() => showModal(index)}
                    />
                  </button>
                </div>

                {/* Modal */}
                {/* {activeModalId === index && ( // Show modal only for the active event
                  <div
                    className="modal w-fit bg-white shadow-md p-1 rounded-md z-10 absolute top-12 right-6"
                    ref={modalRef} // Attach ref to the modal
                  >
                    <Link to={`/admin-dashboard/company/${index}`}>
                      <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                        View full details
                      </p>
                    </Link>
                    <p
                      className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      Update info
                    </p>
                    <p className="flex items-center gap-2 py-2 px-4 hover:bg-purple200 rounded-md cursor-pointer">
                      Archive
                    </p>
                    
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoverSheet;
