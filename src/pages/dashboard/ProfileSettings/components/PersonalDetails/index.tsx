import { FaCircleCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const PersonalDetails = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-8 mb-8">
      <div className="lg:w-[40%] md:px-4">
        <h2 className="font-clash font-semibold text-[20px] mb-2">
          Profile Settings
        </h2>
        <p className="text-neutral600 text-sm">Information about yourself</p>
      </div>
      <div className="lg:w-[60%] md:px-4">
        <div className="flex mt-2">
          <div className="w-1/2 mb-8">
            <h2 className="font-clash font-semibold text-sm mb-2">
              First Name
            </h2>
            <p className="text-neutral800 text-sm">Victor</p>
          </div>
          <div className="w-1/2 mb-8">
            <h2 className="font-clash font-semibold text-sm mb-2">Last Name</h2>
            <p className="text-neutral800 text-sm">Agbeniga</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="font-clash font-semibold text-sm mb-2">
            Email Address
          </h2>
          <p className="text-neutral500 text-sm">thevictoragbeniga@gmail.com</p>
        </div>
        <div className="mb-5">
          <h2 className="font-clash font-semibold text-sm mb-2">User ID</h2>
          <p className="text-neutral500 text-sm">3948774</p>
        </div>
        <p className="flex items-center gap-2 bg-[#E7F6EC] text-[#0F973D] rounded-xl text-xs font-medium w-fit px-3 py-1 mb-5">
          <FaCircleCheck className="text-[#0F973D]" />
          This user ID is active
        </p>
        <p className="flex items-center gap-2  text-purple500 font-medium">
          <FiEdit />
          Edit
        </p>
      </div>
    </div>
  );
};

export default PersonalDetails;
