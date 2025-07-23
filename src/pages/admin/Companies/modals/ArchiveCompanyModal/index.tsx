import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateSingleCompany } from "@/services/companies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ArchiveCompanyModal = ({
  openArchive,
  setOpenArchive,
  companyName,
  companyId,
}: {
  openArchive: boolean;
  setOpenArchive: any;
  companyName: string;
  companyId: string;
}) => {

  const queryClient = useQueryClient();

  const { mutate: updateCompany, isPending: pendingUpdate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSingleCompany(id, data), // ✅ call with correct shape

    onSuccess: () => {
      toast.success("Successful");
      setOpenArchive(false);
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single_company"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = () => {
    updateCompany({
      id: companyId,
      data: {
        status: "ARCHIVED",
      },
    });
  };

  return (
    <Dialog open={openArchive} onOpenChange={setOpenArchive}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Are you sure you want to archive {companyName}?
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600 mt-4">
          This action will remove the company from your live database and it
          will no longer be visible to customers on your website. You can
          restore it anytime from your archived companies.
        </DialogDescription>

        <div className="py-4 text-sm mt-4 flex items-center gap-4">
          <Button
            variant={"secondary"}
            onClick={onSubmit}
            loading={pendingUpdate}
          >
            Yes, Archive
          </Button>
          <Button variant={"outline"} onClick={() => setOpenArchive(false)}>
            No, Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveCompanyModal;
