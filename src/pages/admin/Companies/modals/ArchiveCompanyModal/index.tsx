import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
const ArchiveCompanyModal = ({
  openArchive,
  setOpenArchive,
}: {
  openArchive: boolean;
  setOpenArchive: any;
}) => {
  return (
    <Dialog open={openArchive} onOpenChange={setOpenArchive}>
      <DialogContent className="gap-0">
        <DialogTitle className="text-[20px] font-semibold font-inter mb-2">
          Are you sure you want to archive DHL Logistics?
        </DialogTitle>
        <DialogDescription className="font-medium text-sm text-neutral600 mt-4">
          This action will remove the company from your live database and it
          will no longer be visible to customers on your website. You can
          restore it anytime from your archived companies.
        </DialogDescription>

        <div className="py-4 text-sm mt-4 flex items-center gap-4">
          <Button variant={"secondary"}>Yes, Archive</Button>
          <Button variant={"outline"}>No, Save as Draft</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveCompanyModal;
