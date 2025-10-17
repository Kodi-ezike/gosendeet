import purple from "@/assets/icons/purple-checkmark.png";
import green from "@/assets/icons/green-checkmark.png";
// import avatar1 from "@/assets/images/avatar1.png";
// import { DetailsModal } from "./modals/details";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import CreateBooking from "@/components/CreateBooking";
import empty from "@/assets/images/white-empty.png";
import Rating from "@/components/Rating";

const Calculator = () => {
  // const options = [
  //   { value: "price", title: "Price (cheapest first)" },
  //   { value: "time", title: "Delivery time (fastest)" },
  // ];
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId") || "";

 const location = useLocation();

const { results, inputData: stateInputData } = location.state || {};

const storedInputData = useMemo(() => {
  try {
    const stored = sessionStorage.getItem("bookingInputData");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Error parsing bookingInputData from sessionStorage:", err);
    return null;
  }
}, []);

const inputData = stateInputData || storedInputData || {};

const [bookingRequest] = useState(inputData);
const [data, setData] = useState(results || {});

  useEffect(() => {
    if (results) {
      setData(results);
    }
  }, [results]);

  const handleClick = (data: any) => {
    if (!userId) {
      toast.error("Please sign in to continue");
      sessionStorage.setItem("unauthenticated", "true");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } else {
      navigate("/delivery", {
        state: { bookingDetails: data, bookingRequest: bookingRequest },
      });
    }
  };

  return (
    <div className="md:px-20 px-6 py-16">
      <CreateBooking bookingRequest={bookingRequest} setData={setData} />

      {/* Select options */}
      {/* <Select>
        <SelectTrigger className="mt-16 mb-6 bg-white h-[40px] rounded-full">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => (
            <SelectItem
              value={item.title}
              key={index}
              className="focus:bg-purple200"
            >
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      {(Object.keys(data).length === 0 || data?.data?.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-16">
          <img src={empty} alt="empty quotes" className="h-[300px]" />

          <p className="text-center font-bold text-purple500 ">
            No courier services available for the selected route.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6 mt-16 mb-6">
        {data?.data?.map((item: any, index: number) => (
          <div
            className="border border-purple500 bg-purple300 rounded-md p-4"
            key={index}
          >
            <div className="grid lg:grid-cols-3 lg:justify-between lg:items-center gap-4 flex-col py-4 border-b border-b-neutral700">
              <div className="flex gap-2 md:items-center">
                {/* <img
                  src={avatar1}
                  alt="avatar1"
                  className="w-[30px] h-[30px] rounded-full"
                /> */}
                <div>
                  <div className="flex md:flex-row md:items-center flex-col md:gap-2 md:text-[18px]">
                    <p className="font-medium">{item?.courier?.name}</p>
                    {/* <DetailsModal /> */}
                    <Rating value={item?.courier?.totalRatings} readOnly />
                  </div>
                  <p className="text-sm">
                    Pickup date:{" "}
                    <span className="font-medium"> {item?.pickUpdateDate}</span>
                  </p>
                </div>
              </div>
              {item?.nextDayDelivery ? (
                <div className="flex gap-2 items-center lg:mx-auto bg-green100 w-fit py-2 px-[10px] rounded-full">
                  <img
                    src={green}
                    alt="check"
                    className="w-[20px] h-[20px] rounded-full"
                  />
                  <p className="text-xs text-green500">Next Day Delivery</p>
                </div>
              ) : (
                <div></div>
              )}
              <div className="px-[10px] flex flex-col gap-4 ">
                {item?.pickupOptions?.map((option: string, index: number) => (
                  <div
                    className="flex gap-2 items-center lg:justify-end"
                    key={index}
                  >
                    <img
                      src={purple}
                      alt="check"
                      className="w-[20px] h-[20px] rounded-full"
                    />
                    <p className="text-xs text-purple500">{option}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-3 lg:justify-between lg:items-center md:gap-4 gap-2 justify-between items-center py-4">
              <div>
                <p className="text-purple800 font-clash md:text-[18px] font-semibold">
                  Estimated Delivery:
                </p>
                <p className="text-sm font-medium">
                  {item?.estimatedDeliveryDate}
                </p>
              </div>

              <div className="lg:mx-auto">
                <p className="font-clash md:text-[18px] font-semibold">
                  Starting from {item.price.replace(/^NGN/, "NGN ")}
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button
                  onClick={() => {
                    // setBookingDetails(item);
                    handleClick(item);
                  }}
                  className="px-12 py-3 rounded-full bg-purple400 hover:bg-purple500 text-white text-sm font-medium outline-purple400"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
