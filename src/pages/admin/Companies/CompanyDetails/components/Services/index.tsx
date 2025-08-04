import DeleteModal from "@/components/modals/DeleteModal";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompanyServices } from "@/services/companies";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddServiceModal } from "../../../AddCompany/modals/AddServiceModal";

const Services = ({
  companyId,
  companyServices,
}: {
  companyId: string;
  companyServices: any;
}) => {
  const [openService, setOpenService] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({});
  const [type, setType] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);
  const handleDeleteModal = () => setOpenDeleteModal(null);

  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const showModal = (id: number) => {
    setActiveModalId((prevId) => (prevId === id ? null : id)); // Toggle modal on/off
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // if (isDialogOpen) return; // Skip if dialog is open

      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        setActiveModalId(null); // Close parent modal
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const queryClient = useQueryClient();

  const { mutate: deleteService, isPending: pendingDeleteService } =
    useMutation({
      mutationFn: (id: string) => deleteCompanyServices(id), // ✅ call with correct shape

      onSuccess: () => {
        toast.success("Successful");
        handleDeleteModal();
        queryClient.invalidateQueries({
          queryKey: ["company_services"],
        });
      },

      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
      },
    });

  const handleDeleteService = (id: string) => deleteService(id);
  return (
    <div className="py-4">
      <div className="flex justify-between items-center gap-4 mb-6">
        <p className="text-neutral800 md:text-[20px] font-inter font-semibold">
          Company Services
        </p>

        <Button
          variant={"secondary"}
          onClick={() => {
            setType("create");
            setOpenService(true);
          }}
          className="lg:text-base text-sm"
        >
          <FiEdit /> Add <span className="md:block hidden">New</span> Service
        </Button>
      </div>
      {companyServices && companyServices?.content?.length > 0 && (
        <div className="overflow-auto mb-8">
          <div className="min-w-[1000px] w-full">
            <div className="flex justify-between text-left px-3 xl:px-4 py-4 lg:text-md font-inter font-semibold bg-purple300 w-full">
              <span className="w-[1%] mr-4">
                <input type="checkbox" name="" id="" className="mt-[2px]" />
              </span>
              <span className="flex-1">Service level</span>
              <span className="flex-1">Coverage Area</span>
              <span className="flex-1">Weight Limit</span>
              <span className="flex-1">Pickup</span>
              <span className="flex-1">Delivery</span>
              <span className="w-[2%]"></span>
            </div>

            {companyServices?.content?.map((item: any, index: number) => {
              const isDeleteModalOpen = openDeleteModal === index;
              return (
                <div
                  key={index}
                  className={`relative min-h-[60px] gap-2 bg-white py-2 px-3 xl:px-4 text-sm flex items-center ${
                    index === 0 ? "border-t-0" : "border-t border-t-neutral300"
                  } hover:bg-purple300`}
                >
                  <span className="w-[1%] mr-4">
                    <input type="checkbox" name="" id="" className="mt-[2px]" />
                  </span>
                  <div className="flex-1">
                    <p>{item?.companyServiceLevel?.name}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item?.coverageArea?.name}</p>
                  </div>

                  <div className="flex-1">
                    <p>{item?.weightLimit}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item?.numberOfDaysForPickup} days</p>
                  </div>
                  <div className="flex-1">
                    <p>{item?.numberOfDaysForDelivery} days</p>
                  </div>

                  <div className="w-[2%]">
                    <button className="p-1">
                      <BsThreeDotsVertical
                        size={20}
                        className="p-1 cursor-pointer"
                        onClick={() => showModal(index)}
                      />
                    </button>
                  </div>

                  {/* Modal */}
                  {activeModalId === index && (
                    <>
                      <div
                        className="modal w-fit bg-white shadow-md p-1 rounded-md z-10 absolute top-10 right-0"
                        ref={modalRef}
                      >
                        <p
                          className="flex items-center gap-2 py-1 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                          onClick={() => {
                            setServiceInfo(item);
                            setOpenService(true);
                            setType("edit");
                          }}
                        >
                          Edit service
                        </p>
                        <p
                          className="flex items-center gap-2 py-1 px-4 hover:bg-purple200 rounded-md cursor-pointer"
                          onClick={() => {
                            setOpenDeleteModal(index);
                          }}
                        >
                          Delete service
                        </p>
                      </div>
                    </>
                  )}

                  <DeleteModal
                    onOpenChange={(open) => {
                      open
                        ? setOpenDeleteModal(index)
                        : setOpenDeleteModal(null);
                    }}
                    open={isDeleteModalOpen}
                    title={"Delete company service"}
                    data={item.companyServiceLevel.name ?? ""}
                    id={item?.id ?? ""}
                    handleDelete={handleDeleteService}
                    loading={pendingDeleteService}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {companyServices && companyServices?.content?.length === 0 && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}

      <AddServiceModal
        companyId={companyId}
        openService={openService}
        setOpenService={setOpenService}
        info={serviceInfo}
        setInfo={setServiceInfo}
        type={type}
      />
    </div>
  );
};

export default Services;
