import { cn } from "@/lib/utils";
import React from "react";

type RatingProps = {
  value: number;
  max?: number;
  readOnly?: boolean;
  size?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  readOnly = false,
  size = 24,
  onChange,
  className = "",
}) => {
  const handleClick = (index: number, isHalf: boolean) => {
    if (readOnly || !onChange) return;
    const newValue = isHalf ? index + 0.5 : index + 1;
    onChange(newValue);
  };

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const full = i + 1 <= value;
        const half = !full && i + 0.5 <= value;

        return (
          <div
            key={i}
            className={cn(!readOnly && "cursor-pointer", "relative ")}
            style={{ width: size, height: size }}
          >
            {/* Full Star */}
            <svg
              viewBox="0 0 24 24"
              fill={full ? "#FF8C1A" : "#E1E1E1"}
              //   stroke="#FF8C1A"
              //   strokeWidth="2"
              className="absolute top-0 left-0"
              width={size}
              height={size}
              onClick={() => handleClick(i, false)}
            >
              <path d="M12 2l2.9 6h6.3l-5.1 4.5 1.9 7.5-6-4.5-6 4.5 1.9-7.5-5.1-4.5h6.3z" />
            </svg>

            {/* Half Star */}
            {half && (
              <svg
                viewBox="0 0 24 24"
                fill="#FF8C1A"
                // stroke="#FF8C1A"
                // strokeWidth="2"
                className="absolute top-0 left-0"
                width={size}
                height={size}
                onClick={() => handleClick(i, true)}
              >
                <defs>
                  <linearGradient
                    id={`half-gradient-${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="50%" stopColor="#FF8C1A" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l2.9 6h6.3l-5.1 4.5 1.9 7.5-6-4.5-6 4.5 1.9-7.5-5.1-4.5h6.3z"
                  fill={`url(#half-gradient-${i})`}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
