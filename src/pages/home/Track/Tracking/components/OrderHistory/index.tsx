import { formatDateTime } from "@/lib/utils";

const OrderHistory = ({ data }: any) => {
  return (
    <>
      {data?.data?.trackingHistories?.length > 0 ? (
        <div className="grid md:grid-cols-2">
          {data?.data?.trackingHistories?.map((item: any) => (
            <div className="flex gap-4 py-4" key={item?.id}>
              <div className="flex flex-col gap-1 justify-center items-center">
                <p className="w-[10px] h-[10px] rounded-full bg-green500"></p>
                <p className="flex-1 w-[1.5px] bg-green500/50"></p>
              </div>
              <div>
                <h4 className="font-semibold font-inter mb-1">{item.title}</h4>
                <p className="text-neutral500 mb-1">
                  {formatDateTime(item.timestamp)}
                </p>
                <p className="text-neutral600 mb-2">{item.location}</p>
                <p className="text-neutral600 text-[13px] mb-2">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8">
          <p className="font-medium mb-2">
            No history available — please check back later for updates.
          </p>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
