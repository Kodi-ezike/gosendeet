import { IoSearchOutline } from "react-icons/io5";

const LoginHistory = ({ data }: { data: any }) => {

  const login = data?.data?.content;
  
  return (
    <div>
      <div className="flex flex-row md:justify-end gap-4 mb-6">
        <div className="flex items-center  gap-2 border-2 rounded-lg h-[40px] px-2 py-2">
          <IoSearchOutline className="text-neutral500" />
          <input
            type="text"
            role="search"
            className="border-0 outline-0 w-[200px] text-sm text-neutral600"
            placeholder="Search date"
          />
        </div>
      </div>
      {login && login?.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[500px] w-full relative">
            <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-md font-inter font-semibold bg-purple300 w-full">
              <span className="md:w-[50%] w-[40%]">Device</span>
              <span className="flex-1">Browser</span>
              <span className="flex-1">Date &Time</span>
            </div>

            {login?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative h-[60px] bg-white px-3 xl:px-4 text-sm flex items-center ${
                    index === 0 ? "border-b-0" : "border-b border-b-neutral300"
                  } hover:bg-purple300`}
                >
                  <div className="md:w-[50%] w-[40%]">
                    <p>{item.device}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.browser}</p>
                  </div>
                  <div className="flex-1">
                    <p>11:37 PM, 27 May 2023 </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {login && login?.length === 0 && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginHistory;
