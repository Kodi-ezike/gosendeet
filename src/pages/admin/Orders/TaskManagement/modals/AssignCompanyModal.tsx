import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getCompanyList } from "@/services/companies";
import { assignTasks } from "@/services/tasks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";

type CompanyListItem = {
  id: string;
  name: string;
  email?: string;
};

interface AssignCompanyModalProps {
  taskIds: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AssignCompanyModal = ({
  taskIds,
  open,
  onOpenChange,
  onSuccess,
}: AssignCompanyModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["companies", "assign", search],
    queryFn: () => getCompanyList(1, 50, "", "", search),
    enabled: open,
  });

  const companies = (data?.data?.content ?? []) as CompanyListItem[];

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { taskIds: string[]; companyId?: string | null }) =>
      assignTasks(payload),
    onSuccess: (_, variables) => {
      toast.success(
        variables.companyId
          ? "Tasks assigned successfully"
          : "Tasks were unassigned"
      );
      setSelectedCompany("");
      onSuccess();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to update assignment"));
    },
  });

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedCompany("");
    } else {
      refetch();
    }
  }, [open, refetch]);

  const handleAssign = () => {
    if (!selectedCompany) {
      toast.error("Select a company");
      return;
    }
    mutate({ taskIds, companyId: selectedCompany });
  };

  const handleUnassign = () => {
    mutate({ taskIds, companyId: null });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Company</DialogTitle>
          <DialogDescription>
            Assign {taskIds.length} task{taskIds.length === 1 ? "" : "s"} to a dispatch partner
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">{taskIds.length}</span> draft task
              {taskIds.length === 1 ? "" : "s"} will be assigned. These tasks will be ready for dispatch after assignment.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Search Company</label>
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoFocus
            />
            <p className="text-xs text-neutral500">
              Type to filter the list below
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Select Company</label>
              {isLoading && (
                <span className="text-xs text-neutral500">Loading...</span>
              )}
            </div>
            <Select
              value={selectedCompany}
              onValueChange={(value) => setSelectedCompany(value)}
              disabled={isLoading}
            >
              <SelectTrigger className="h-auto min-h-[2.5rem]">
                <SelectValue placeholder="Choose a dispatch partner" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {companies.map((company) => (
                  <SelectItem value={company.id} key={company.id}>
                    <div className="flex flex-col py-1">
                      <span className="font-medium">{company.name}</span>
                      {company.email && (
                        <span className="text-xs text-neutral500">
                          {company.email}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
                {!isLoading && companies.length === 0 && (
                  <SelectItem value="__no_companies" disabled>
                    {search ? "No companies match your search" : "No companies available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 pt-4 border-t border-neutral200">
            <Button
              type="button"
              variant="outline"
              className="border-neutral300 text-neutral800"
              onClick={handleUnassign}
              disabled={taskIds.length === 0 || isPending}
            >
              Remove Assignment
            </Button>
            <Button
              type="button"
              onClick={handleAssign}
              disabled={!selectedCompany || taskIds.length === 0}
              loading={isPending}
              className="sm:min-w-[120px]"
            >
              Assign Tasks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCompanyModal;
