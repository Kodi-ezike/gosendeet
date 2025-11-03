import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Package, TrendingUp, Users, MapPin } from "lucide-react";

const StatsBar = () => {
  const stats = [
    {
      icon: Package,
      value: 10000,
      suffix: "+",
      label: "Shipments Delivered",
      color: "from-purple-400 to-blue-400",
    },
    {
      icon: Users,
      value: 5000,
      suffix: "+",
      label: "Happy Customers",
      color: "from-blue-400 to-green-400",
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: "%",
      label: "On-Time Delivery",
      color: "from-green-400 to-purple-400",
    },
    {
      icon: MapPin,
      value: 500,
      suffix: "+",
      label: "Cities Covered",
      color: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <div className="v1-stats-section py-20 md:px-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ stat, index }: { stat: any; index: number }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  const Icon = stat.icon;

  return (
    <motion.div
      className="v1-stat-card group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onViewportEnter={() => setIsInView(true)}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[2px] from-purple-500 via-blue-500 to-green-500">
        <div className="w-full h-full bg-[#1a1f3a] rounded-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Number */}
        <div className="mb-2">
          <span className="text-5xl font-bold text-white font-clash">
            {count.toLocaleString()}
          </span>
          <span className="text-5xl font-bold v1-gradient-text">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-white/60 font-medium">{stat.label}</p>
      </div>
    </motion.div>
  );
};

export default StatsBar;
