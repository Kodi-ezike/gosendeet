const ReceiverDetails = ({ data }: any) => {
  return (
    <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 md:text-base text-sm py-4">
      <div className="flex flex-col gap-2">
        <p className="font-semibold font-clash">Pick From</p>
        <p className="font-medium">{data?.data?.sender?.username}</p>
        <p className="text-neutral500">{data?.data?.pickupLocation}</p>
        <p className="text-neutral500">{data?.data?.sender?.phone}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold font-clash">Ship to</p>
        <p className="font-medium">{data?.data?.receiver?.name}</p>
        <p className="text-neutral500">{data?.data?.destination}</p>
        <p className="text-neutral500">{data?.data?.receiver?.phoneNumber}</p>
      </div>
    </div>
  );
};

export default ReceiverDetails;
