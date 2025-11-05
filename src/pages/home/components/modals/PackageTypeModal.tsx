import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useGetPackageType } from "@/queries/admin/useGetAdminSettings";
import { cn } from "@/lib/utils";
import { FiBox, FiPackage, FiCheck } from "react-icons/fi";
import packageIcon from "@/assets/icons/size.png";

interface PackageTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (packageTypeId: string, packageName: string) => void;
}

export function PackageTypeModal({
  open,
  onOpenChange,
  value,
  onSelect,
}: PackageTypeModalProps) {
  const { data: packageTypes } = useGetPackageType({ minimize: true });
  const packages = packageTypes?.data || [];

  const handleSelectPackage = (packageId: string, packageName: string) => {
    onSelect(packageId, packageName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh]">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Select Package Type
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Choose the package type that best fits your shipment
        </DialogDescription>

        <div className="mt-6">
          {packages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FiPackage className="w-12 h-12 mb-3 opacity-50" />
              <p>No package types available</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg: any) => {
                const isSelected = value === String(pkg.id);
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectPackage(String(pkg.id), pkg.name)}
                    className={cn(
                      "relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg text-left group",
                      isSelected
                        ? "border-amber-500 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-amber-300 bg-white"
                    )}
                  >
                    {/* Selection Check */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Package Icon/Image */}
                    <div className={cn(
                      "w-16 h-16 rounded-xl mb-4 flex items-center justify-center transition-all",
                      isSelected ? "bg-amber-100" : "bg-gray-100 group-hover:bg-amber-50"
                    )}>
                      <img
                        src={packageIcon}
                        alt={pkg.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>

                    {/* Package Info */}
                    <div>
                      <h3 className={cn(
                        "font-clash font-bold text-lg mb-2 transition-colors",
                        isSelected ? "text-amber-700" : "text-gray-900"
                      )}>
                        {pkg.name}
                      </h3>

                      <div className="space-y-1 text-sm">
                        <p className={cn(
                          "font-semibold",
                          isSelected ? "text-amber-600" : "text-gray-600"
                        )}>
                          Max Weight: {pkg.maxWeight}{pkg.weightUnit}
                        </p>

                        {pkg.dimensions && (
                          <p className="text-gray-500 text-xs">
                            {pkg.dimensions}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-2xl transition-opacity pointer-events-none",
                      isSelected
                        ? "bg-amber-400/5"
                        : "bg-amber-400/0 group-hover:bg-amber-400/5"
                    )} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mt-4">
          <FiBox className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Select the package type that matches your shipment size and weight</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
