import purple from "@/assets/icons/purple-checkmark.png";
import green from "@/assets/icons/green-checkmark.png";
// import avatar1 from "@/assets/images/avatar1.png";
// import { DetailsModal } from "./modals/details";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import FormHorizontalBar from "@/pages/home/components/FormHorizontalBar";
import empty from "@/assets/images/white-empty.png";
import Rating from "@/components/Rating";
import { FiCalendar, FiTruck, FiFilter, FiX, FiPackage } from "react-icons/fi";
import { SiFedex, SiDhl, SiUps } from "react-icons/si";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Share2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { shareQuotes } from "@/services/user";
import { LIVE_URL } from "@/services/axios";
import { useGetSharedQuotes } from "@/queries/user/useGetUserBookings";

const Calculator = () => {
  // const options = [
  //   { value: "price", title: "Price (cheapest first)" },
  //   { value: "time", title: "Delivery time (fastest)" },
  // ];
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId") || "";

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const shareId = searchParams.get("shareId") || "";

  const { data: sharedQuote } = useGetSharedQuotes(shareId);

  const { results, inputData: stateInputData } = location.state || {};
  const { mode } = location?.state || "gosendeet";
  console.log(mode);

  const storedInputData = useMemo(() => {
    try {
      const stored = sessionStorage.getItem("bookingInputData");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Error parsing bookingInputData from sessionStorage:", err);
      return null;
    }
  }, []);

  const sharedQuoteRequest = sharedQuote?.data?.quoteRequests?.[0];

  const inputData =
    sharedQuoteRequest || stateInputData || storedInputData || {};

  const [bookingRequest] = useState(inputData);
  const [data, setData] = useState(results || {});
  const [sortBy, setSortBy] = useState("price-asc");
  const [filterPickupDate, setFilterPickupDate] = useState("");
  const [filterDeliveryDate, setFilterDeliveryDate] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    if (shareId && sharedQuote) {
      setData(sharedQuote?.quotes);
    } else if (results) {
      setData(results);
    }
  }, [results, sharedQuote, shareId]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!data?.data || data?.data?.length === 0) return [];

    let filtered = [...data.data];

    // Filter by pickup date
    if (filterPickupDate) {
      filtered = filtered.filter(
        (item: any) => item?.pickUpdateDate === filterPickupDate
      );
    }

    // Filter by delivery date
    if (filterDeliveryDate) {
      filtered = filtered.filter(
        (item: any) => item?.estimatedDeliveryDate === filterDeliveryDate
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter((item: any) => {
        const price = parseFloat(item?.price?.replace(/[^\d.]/g, ""));
        if (priceRange === "0-5000") return price <= 5000;
        if (priceRange === "5000-10000") return price > 5000 && price <= 10000;
        if (priceRange === "10000-20000")
          return price > 10000 && price <= 20000;
        if (priceRange === "20000+") return price > 20000;
        return true;
      });
    }

    // Sort data
    if (sortBy === "price-asc") {
      filtered.sort((a: any, b: any) => {
        const priceA = parseFloat(a?.price?.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b?.price?.replace(/[^\d.]/g, ""));
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      filtered.sort((a: any, b: any) => {
        const priceA = parseFloat(a?.price?.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b?.price?.replace(/[^\d.]/g, ""));
        return priceB - priceA;
      });
    } else if (sortBy === "delivery-fastest") {
      // Sort by delivery date (earliest first)
      filtered.sort((a: any, b: any) => {
        return (
          new Date(a?.estimatedDeliveryDate).getTime() -
          new Date(b?.estimatedDeliveryDate).getTime()
        );
      });
    }

    return filtered;
  }, [data, sortBy, filterPickupDate, filterDeliveryDate, priceRange]);

  // Get unique pickup dates for filter
  const uniquePickupDates = useMemo(() => {
    if (!data?.data) return [];
    return [
      ...new Set(data.data.map((item: any) => item?.pickUpdateDate)),
    ].filter(Boolean);
  }, [data]);

  // Get unique delivery dates for filter
  const uniqueDeliveryDates = useMemo(() => {
    if (!data?.data) return [];
    return [
      ...new Set(data.data.map((item: any) => item?.estimatedDeliveryDate)),
    ].filter(Boolean);
  }, [data]);

  const clearFilters = () => {
    setFilterPickupDate("");
    setFilterDeliveryDate("");
    setPriceRange("all");
    setSortBy("price-asc");
  };

  const activeFiltersCount = [
    filterPickupDate,
    filterDeliveryDate,
    priceRange !== "all",
  ].filter(Boolean).length;

  // Get courier logo based on name
  const getCourierLogo = (courierName: string) => {
    const name = courierName?.toLowerCase() || "";

    // Match known courier services with their icons
    if (name.includes("fedex")) return SiFedex;
    if (name.includes("dhl")) return SiDhl;
    if (name.includes("ups")) return SiUps;

    // Default fallback icon
    return FiPackage;
  };

  const handleClick = (data: any) => {
    if (!userId) {
      toast.error("Please sign in to continue");
      sessionStorage.setItem("unauthenticated", "true");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } else {
      navigate("/delivery", {
        state: { bookingDetails: data, bookingRequest: bookingRequest },
      });
    }
  };

  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const { mutate: share, isPending: shareLoading } = useMutation({
    mutationFn: shareQuotes,
    onSuccess: (data: any) => {
      const shareId = data?.data?.shareId;
      setShareUrl(`${LIVE_URL}/cost-calculator?shareId=${shareId}`);
      toast.success("Share link created");
    },
    onError: (error: any) => {
      toast.error(error?.error);
    },
  });

  const copyUrl = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  // ⏳ Auto-reset after 30 seconds
  useEffect(() => {
    if (!shareUrl) return;

    const timer = setTimeout(() => {
      setShareUrl(null); // revert back to Share Quote
    }, 10000);

    return () => clearTimeout(timer);
  }, [shareUrl]);

  const handleShare = () => {
    share([
      {
        ...bookingRequest,
        itemValue: Number(bookingRequest.itemPrice),
        quantity: 1,
        packageDescription: {
          isFragile: false,
          isPerishable: false,
          isExclusive: false,
          isHazardous: false,
        },
      },
    ]);
  };

  return (
    <div className="md:px-20 px-6 py-4 bg-white min-h-screen">
      <div className="w-full mb-12">
        <FormHorizontalBar
          variant="minimal"
          activeMode={mode}
          bookingRequest={bookingRequest}
          setData={setData}
        />
      </div>

      {(!data?.data || data?.data?.length === 0) && (
        <div className="flex flex-col items-center justify-center mt-20 max-w-2xl mx-auto">
          <img src={empty} alt="empty quotes" className="h-[200px]" />

          <p className="text-center font-bold text-amber-600 text-lg mb-1">
            No courier services available
          </p>
          <p className="text-center text-gray-600 text-sm">
            Use the form above to search for courier services by entering your
            pickup location, destination, and package details.
          </p>
        </div>
      )}

      {/* Results Section Header */}

      {mode === "compare" && (
        <>
          {data?.data && data?.data?.length > 0 && (
            <div className="max-w-5xl mx-auto mt-4 mb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div className="md:w-5xl">
                  <h2 className="font-clash font-bold text-2xl md:text-3xl text-[#1a1a1a] mb-2">
                    Available Courier Services
                  </h2>
                  <div className="flex md:flex-row flex-col gap-2 justify-between md:items-center">
                    <p className="text-gray-600 text-sm md:text-base">
                      Found{" "}
                      <span className="font-bold text-amber-600">
                        {filteredAndSortedData.length}
                      </span>{" "}
                      courier{filteredAndSortedData.length !== 1 ? "s" : ""} for
                      your route
                      {activeFiltersCount > 0 && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({activeFiltersCount} filter
                          {activeFiltersCount !== 1 ? "s" : ""} active)
                        </span>
                      )}
                    </p>

                    <Button
                      className="w-fit"
                      loading={shareLoading}
                      onClick={shareUrl ? copyUrl : handleShare}
                    >
                      {shareUrl ? <Copy /> : <Share2 />}
                      {shareUrl ? "Copy Link" : "Share Quote"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filters & Sort Section */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FiFilter className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-sm text-gray-700">
                    Filter & Sort Results
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="ml-auto flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                      Clear All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Sort By */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-9 text-sm bg-white border-gray-300">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-asc">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="delivery-fastest">
                          Fastest Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pickup Date Filter */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Pickup Date
                    </label>
                    <Select
                      value={filterPickupDate || "all"}
                      onValueChange={(val) =>
                        setFilterPickupDate(val === "all" ? "" : val)
                      }
                    >
                      <SelectTrigger className="h-9 text-sm bg-white border-gray-300">
                        <SelectValue placeholder="All dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All dates</SelectItem>
                        {uniquePickupDates.map((date: any) => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delivery Date Filter */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Delivery Date
                    </label>
                    <Select
                      value={filterDeliveryDate || "all"}
                      onValueChange={(val) =>
                        setFilterDeliveryDate(val === "all" ? "" : val)
                      }
                    >
                      <SelectTrigger className="h-9 text-sm bg-white border-gray-300">
                        <SelectValue placeholder="All dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All dates</SelectItem>
                        {uniqueDeliveryDates.map((date: any) => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                      Price Range
                    </label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-9 text-sm bg-white border-gray-300">
                        <SelectValue placeholder="All prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All prices</SelectItem>
                        <SelectItem value="0-5000">₦0 - ₦5,000</SelectItem>
                        <SelectItem value="5000-10000">
                          ₦5,000 - ₦10,000
                        </SelectItem>
                        <SelectItem value="10000-20000">
                          ₦10,000 - ₦20,000
                        </SelectItem>
                        <SelectItem value="20000+">₦20,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 mb-6 max-w-5xl mx-auto">
            {filteredAndSortedData.length === 0 &&
              data?.data &&
              data?.data?.length > 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-center font-bold text-gray-600 text-lg mb-2">
                    No results match your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-sm underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            {filteredAndSortedData.map((item: any, index: number) => (
              <div
                className={cn(
                  "bg-white rounded-2xl overflow-hidden",
                  "border-2 border-gray-200",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
                  "transition-all duration-300",
                  "hover:shadow-[0_12px_40px_rgba(251,146,60,0.25)] hover:border-amber-300 hover:-translate-y-1"
                )}
                key={index}
              >
                {/* Header Section - Courier Info & Price */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Courier Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {/* Courier Logo */}
                        {(() => {
                          const LogoIcon = getCourierLogo(item?.courier?.name);
                          return (
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
                              <LogoIcon className="w-9 h-9 text-gray-700" />
                            </div>
                          );
                        })()}

                        {/* Courier Name & Rating */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h3 className="font-clash font-bold text-xl text-[#1a1a1a]">
                              {item?.courier?.name}
                            </h3>
                            <Rating
                              value={item?.courier?.totalRatings}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      {/* Pickup & Delivery Info */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="w-4 h-4 text-blue-500" />
                          <span>
                            Pickup Date:{" "}
                            <span className="font-semibold text-[#1a1a1a]">
                              {item?.pickUpdateDate}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiTruck className="w-4 h-4 text-emerald-500" />
                          <span>
                            Estimated Delivery:{" "}
                            <span className="font-semibold text-[#1a1a1a]">
                              {item?.estimatedDeliveryDate}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Badge Section */}
                    <div className="flex flex-col gap-3 items-end">
                      {/* Price - Prominent Position */}
                      <div className="text-right">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Total Cost
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-semibold text-gray-500">
                            ₦
                          </span>
                          <p className="text-2xl md:text-3xl font-clash font-bold text-amber-600">
                            {item.price.replace(/^NGN\s?/, "")}
                          </p>
                        </div>
                      </div>

                      {/* Next Day Delivery Badge */}
                      {item?.nextDayDelivery && (
                        <div className="flex gap-2 items-center bg-gradient-to-r from-emerald-50 to-teal-50 py-2 px-3 rounded-full border border-emerald-300/50">
                          <img
                            src={green}
                            alt="check"
                            className="w-[16px] h-[16px] rounded-full"
                          />
                          <p className="text-xs font-bold text-emerald-700">
                            Next Day
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                {item?.pickupOptions && item?.pickupOptions.length > 0 && (
                  <div className="px-6 py-3 bg-gray-50/50">
                    <div className="flex flex-wrap gap-3">
                      {item?.pickupOptions?.map(
                        (option: string, idx: number) => (
                          <div
                            className="flex gap-2 items-center bg-white py-2 px-3 rounded-lg border border-amber-200/50 shadow-sm"
                            key={idx}
                          >
                            <img
                              src={purple}
                              alt="check"
                              className="w-[16px] h-[16px] rounded-full"
                            />
                            <p className="text-xs font-semibold text-gray-700">
                              {option}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Section - CTA */}
                <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-amber-50/30">
                  <div className="flex items-center justify-between gap-4">
                    {/* Additional Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiTruck className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">
                        Fast & Reliable Service
                      </span>
                    </div>

                    {/* Book Now Button - Modern Design */}
                    <Button
                      onClick={() => {
                        handleClick(item);
                      }}
                      className={cn(
                        "group relative px-8 py-2.5 rounded-xl font-bold text-sm",
                        "bg-[#1a1a1a] hover:bg-amber-600",
                        "text-white transition-all duration-300",
                        "shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(251,146,60,0.4)]",
                        "border border-transparent hover:border-amber-400",
                        "outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
                        "overflow-hidden"
                      )}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Book Now</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === "gosendeet" && (
        <></>
      )}
    </div>
  );
};

export default Calculator;
