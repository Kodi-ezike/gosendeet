import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const StatsHero = () => {
  return (
    <div className="v2-stats-section py-16 md:px-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {/* Stat 1 */}
          <StatCard
            value={100000}
            suffix="+"
            label="Delivery"
            color="text-[#1a1f3a]"
            index={0}
          />

          {/* Stat 2 */}
          <StatCard
            value={80000}
            suffix="+"
            label="Customers"
            color="text-[#1a1f3a]"
            index={1}
          />

          {/* Stat 3 */}
          <StatCard
            value={20000}
            suffix="+"
            label="Reviews"
            color="text-[#1a1f3a]"
            index={2}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  suffix,
  label,
  color,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  index: number;
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onViewportEnter={() => setIsInView(true)}
    >
      <div className={`font-clash font-black text-[80px] md:text-[100px] lg:text-[120px] ${color} leading-none v2-number-shadow`}>
        {count.toLocaleString()}
        <span className="v2-gradient-accent">{suffix}</span>
      </div>
      <div className="text-[#1a1f3a] font-bold text-xl md:text-2xl mt-4">{label}</div>
    </motion.div>
  );
};

export default StatsHero;
