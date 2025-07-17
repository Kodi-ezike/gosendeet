import DeleteModal from "@/components/modals/DeleteModal";
import { useGetCompanyPricing } from "@/queries/admin/useGetAdminCompanies";
import { deleteCompanyPricing } from "@/services/companies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";

const Pricing = ({
  serviceId,
  setType,
  setOpenPricing,
  setPricingInfo,
  info,
  setServiceId,
}: {
  serviceId: string;
  setType: any;
  setOpenPricing: any;
  setPricingInfo: any;
  info: any;
  setServiceId: any;
}) => {
  const { data: company_pricing } = useGetCompanyPricing(serviceId);
  const [openDeletePrice, setOpenDeletePrice] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deletePrice, isPending: pendingDelete } = useMutation({
    mutationFn: ({ id, pricingId }: { id: string; pricingId: string }) =>
      deleteCompanyPricing(id, pricingId),

    onSuccess: () => {
      toast.success("Successful");
      setOpenDeletePrice(false);
      queryClient.invalidateQueries({
        queryKey: ["company_pricing"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleDelete = () => deletePrice({ id: serviceId, pricingId: info.id });
  return (
    <div>
      {company_pricing?.data?.map((item: any, index: number) => {
        return (
          <div key={index} className="flex mt-2">
            <div className="flex items-center gap-4 flex-1">
              <p className="font-medium">Base Price:</p>
              <p># {item.basePrice}</p>
            </div>

            <div className="flex items-center gap-4">
              <FiEdit
                size={20}
                className="cursor-pointer text-purple500"
                onClick={() => {
                  setType("edit");
                  setPricingInfo(item);
                  setOpenPricing(true);
                  setServiceId(serviceId);
                }}
              />

              <BiSolidTrashAlt
                size={20}
                className="cursor-pointer text-[#F56630]"
                onClick={() => {
                  setOpenDeletePrice(true);
                  setPricingInfo(item);
                }}
              />

              <DeleteModal
                onOpenChange={setOpenDeletePrice}
                open={openDeletePrice}
                title={"Delete delivery price"}
                data={`base price of #${item.basePrice}`}
                id={item?.id ?? ""}
                handleDelete={handleDelete}
                loading={pendingDelete}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pricing;
