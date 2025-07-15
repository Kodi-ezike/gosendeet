import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { PackageTypeModal } from "./modals/PackageTypeModal";
import { FiEdit } from "react-icons/fi";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";
import { Spinner } from "@/components/Spinner";
import { deletePackageType } from "@/services/adminSettings";
import { toast } from "sonner";
import DeleteModal from "@/components/modals/DeleteModal";

const PackageType = () => {
  const { data, isLoading, isSuccess, isError } = useGetPackageType();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [type, setType] = useState("");
  const [info, setInfo] = useState<{ id: string; name: string } | null>(null);
  const queryClient = useQueryClient();

  const { mutate: deleteService, isPending: pendingDelete } = useMutation({
    mutationFn: (id: string) => deletePackageType(id), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpenDelete(false);
      queryClient.invalidateQueries({
        queryKey: ["package_types"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleDelete = (id: string) => deleteService(id);
  return (
    <div>
      <div className="flex items-center gap-4 justify-end mb-4">
        <div className="flex items-center gap-2 border-2 rounded-lg h-[40px] px-2 py-2">
          <IoSearchOutline className="text-neutral500" />
          <input
            type="text"
            role="search"
            className="border-0 outline-0 w-[150px] text-sm text-neutral600"
            placeholder="Search"
          />
        </div>

        <Button
          variant={"secondary"}
          className="h-[42px]"
          onClick={() => {
            setOpen(true);
            setType("create");
          }}
        >
          <Plus /> Add new
        </Button>
      </div>

      {isLoading && !isSuccess && (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isError && !isLoading && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There was an error getting the data
          </p>
        </div>
      )}

      {!isLoading && isSuccess && data && data?.data?.content?.length > 0 && (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] w-full relative">
            <div className="flex justify-between text-left px-3 xl:px-4 py-4 text-sm font-inter font-semibold bg-purple300 w-full">
              <span className="w-[15%]">Package type</span>
              <span className="flex-1">Length</span>
              <span className="flex-1">Width</span>
              <span className="flex-1">Height</span>
              <span className="flex-1">Max Weight</span>
              <span className="flex-1">Dimension unit</span>
              <span className="flex-1">Weight unit</span>
              <span className="flex-1">Code</span>
              <span className="flex-1">Status</span>
              <span className="w-[5%]"></span>
            </div>

            {data?.data?.content?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative min-h-[60px] bg-white py-2 px-3 xl:px-4 text-sm flex items-center ${
                    index === 0 ? "border-t-0" : "border-t border-t-neutral300"
                  } hover:bg-purple300`}
                >
                  <div className="w-[15%]">
                    <p>{item.name}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.length}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.width}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.height}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.maxWeight}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.dimensionUnit}</p>
                  </div>
                  <div className="flex-1">
                    <p>{item.weightUnit}</p>
                  </div>
                  <div className="flex-1">{item.code}</div>
                  <div className="flex-1">
                    <Switch
                      checked={item.active}
                      // onCheckedChange={field.onChange}
                    />
                  </div>
                  <div className="w-[5%] flex items-center gap-4">
                    <FiEdit
                      size={20}
                      className="cursor-pointer text-purple500"
                      onClick={() => {
                        setOpen(true);
                        setType("edit");
                        setInfo(item);
                      }}
                    />

                    <BiSolidTrashAlt
                      size={20}
                      className="cursor-pointer text-[#F56630]"
                      onClick={() => {
                        setOpenDelete(true);
                        setInfo(item);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {data && data?.data?.content?.length === 0 && !isLoading && isSuccess && (
        <div className="h-[50vh] w-full flex justify-center flex-col items-center">
          <p className="font-semibold font-inter text-xl text-center">
            There are no results
          </p>
        </div>
      )}

      <PackageTypeModal open={open} setOpen={setOpen} type={type} info={info} />

      <DeleteModal
        onOpenChange={setOpenDelete}
        open={openDelete}
        title={"Delete package type"}
        data={info?.name ?? ""}
        id={info?.id ?? ""}
        handleDelete={handleDelete}
        loading={pendingDelete}
      />
    </div>
  );
};

export default PackageType;
