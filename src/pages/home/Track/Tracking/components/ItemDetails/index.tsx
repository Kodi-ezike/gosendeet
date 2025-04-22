
const ItemDetails = () => {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-y-8 gap-x-4 md:text-base text-sm py-4">
            <div className="flex flex-col gap-3">
              <p className="font-semibold font-clash">Pickup Created</p>
              <p className="">11:37 PM, 27 May 2023 </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold font-clash">Logistics</p>
              <p>DHL Ibadan</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold font-clash">Parcel Weight</p>
              <p>15kg | 3x5x8 cm</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold font-clash">Category</p>
              <p>Envelope</p>
            </div>
          </div>
  )
}

export default ItemDetails