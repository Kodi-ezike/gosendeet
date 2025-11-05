import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";

interface PickupDateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSelect: (date: string) => void;
}

export function PickupDateModal({
  open,
  onOpenChange,
  value,
  onSelect,
}: PickupDateModalProps) {
  const [selectedDate, setSelectedDate] = useState(value || "");
  const [selectedTime, setSelectedTime] = useState("09:00");

  useEffect(() => {
    if (open && value) {
      setSelectedDate(value);
    }
  }, [open, value]);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const formatDisplayDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDayLabel = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    const diffTime = compareDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return "";
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleQuickSelect = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setSelectedDate(formatDate(date));
  };

  const handleConfirm = () => {
    if (selectedDate) {
      const fullDateTime = `${selectedDate} ${selectedTime}`;
      onSelect(fullDateTime);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-clash font-bold text-gray-900">
          Select Pickup Date & Time
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          Choose when you want your package to be picked up
        </DialogDescription>

        <div className="space-y-6 mt-6">
          {/* Quick Select */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Quick Select</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleQuickSelect(0)}
                className={cn(
                  "py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                  selectedDate === formatDate(new Date())
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700"
                )}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect(1)}
                className={cn(
                  "py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                  selectedDate === formatDate(new Date(Date.now() + 86400000))
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700"
                )}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect(2)}
                className={cn(
                  "py-3 px-4 rounded-xl border-2 transition-all font-semibold",
                  selectedDate === formatDate(new Date(Date.now() + 172800000))
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700"
                )}
              >
                In 2 Days
              </button>
            </div>
          </div>

          {/* Date Grid */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              Select Date
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {dates.map((date) => {
                const dateStr = formatDate(date);
                const isSelected = selectedDate === dateStr;
                const dayLabel = getDayLabel(date);

                return (
                  <button
                    key={dateStr}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all text-center",
                      isSelected
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                    )}
                  >
                    {dayLabel && (
                      <div className={cn(
                        "text-xs font-bold mb-1",
                        isSelected ? "text-amber-600" : "text-gray-500"
                      )}>
                        {dayLabel}
                      </div>
                    )}
                    <div className={cn(
                      "text-xs font-medium mb-0.5",
                      isSelected ? "text-amber-600" : "text-gray-500"
                    )}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={cn(
                      "text-lg font-bold",
                      isSelected ? "text-amber-700" : "text-gray-900"
                    )}>
                      {date.getDate()}
                    </div>
                    <div className={cn(
                      "text-xs",
                      isSelected ? "text-amber-600" : "text-gray-500"
                    )}>
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                Select Time
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-2 px-3 rounded-lg border-2 transition-all font-semibold text-sm",
                      selectedTime === time
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Summary */}
          {selectedDate && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 mb-1">
                <FiCalendar className="w-4 h-4" />
                Selected Pickup
              </div>
              <p className="text-gray-900 font-bold text-lg">
                {formatDisplayDate(new Date(selectedDate))} at {selectedTime}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          <Button
            type="button"
            onClick={handleConfirm}
            variant="secondary"
            size="custom"
            className="w-full py-4 text-base font-bold"
            disabled={!selectedDate}
          >
            Confirm Pickup Date
          </Button>
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <FiCalendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>Select your preferred pickup date and time. You can schedule pickups up to 14 days in advance.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
