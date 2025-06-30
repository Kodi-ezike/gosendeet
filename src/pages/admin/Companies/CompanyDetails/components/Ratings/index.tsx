import positive from "@/assets/icons/thumbs-up.png";
import negative from "@/assets/icons/thumbs-down.png";
import neutral from "@/assets/icons/hand-peace.png";
import avatar from "@/assets/images/avatar1.png";
import Rating from "@/components/Rating";
const Ratings = () => {
  //   const [rating, setRating] = useState(3.5);

  return (
    <div>
      <div className="bg-white mb-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-6 gap-6 md:p-6 p-4">
          <div>
            <p className="font-medium text-sm mb-2">Responses Received</p>
            <p className="font-semibold text-2xl">18</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src={positive} alt="positive" />
            <div>
              <p className="font-medium text-sm mb-2">Positive</p>
              <p className="font-semibold text-2xl">85%</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img src={neutral} alt="neutral" />
            <div>
              <p className="font-medium text-sm mb-2">Neutral</p>
              <p className="font-semibold text-2xl">10%</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img src={negative} alt="negative" />
            <div>
              <p className="font-medium text-sm mb-2">Negative</p>
              <p className="font-semibold text-2xl">5%</p>
            </div>
          </div>
        </div>

        <hr />
      </div>

      <div className="bg-white mb-8 md:p-6 p-4">
        <div className="flex gap-2 items-center mb-4">
          <img src={avatar} alt="avatar" />
          <div>
            <p className="font-medium">Abimbola Momodu</p>
            {/* <Rating value={rating} onChange={setRating}/> */}
            <Rating value={4} />
          </div>
        </div>
        <p className="mb-4">
          "Efficient Project Management but Limited Customer Support"
        </p>
        <p className="text-sm text-neutral500">Oct 23, 2024</p>
      </div>
      
      <div className="bg-white mb-8 md:p-6 p-4">
        <div className="flex gap-2 items-center mb-4">
          <img src={avatar} alt="avatar" />
          <div>
            <p className="font-medium">Abimbola Momodu</p>
            {/* <Rating value={rating} onChange={setRating}/> */}
            <Rating value={4} />
          </div>
        </div>
        <p className="mb-4">
          "Efficient Project Management but Limited Customer Support"
        </p>
        <p className="text-sm text-neutral500">Oct 23, 2024</p>
      </div>
    </div>
  );
};

export default Ratings;
