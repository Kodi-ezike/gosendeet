import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";

interface VariationSwitcherProps {
  currentVariation: string;
  onVariationChange: (variation: string) => void;
}

const VariationSwitcher = ({
  currentVariation,
  onVariationChange,
}: VariationSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const variations = [
    {
      id: "v1",
      name: "Premium Dark",
      description: "Professional, tech-forward design",
      color: "from-purple-600 to-blue-600",
      preview: "#0a0e27",
    },
    {
      id: "v2",
      name: "Bold Contrast",
      description: "Energetic, data-driven platform",
      color: "from-orange-500 to-yellow-500",
      preview: "#FFA500",
    },
    {
      id: "v3",
      name: "V3 - Original Hero",
      description: "Clean minimal with default hero",
      color: "from-amber-400 to-yellow-400",
      preview: "#ffffff",
      badge: "ORIGINAL",
    },
    {
      id: "v3-hero-a",
      name: "V3 - Trust Before Form",
      description: "Hero optimized for conversion",
      color: "from-amber-500 to-yellow-500",
      preview: "#fffbeb",
      badge: "HERO A",
    },
    {
      id: "v3-hero-b",
      name: "V3 - Simplified",
      description: "Clean hero without logo carousel",
      color: "from-amber-500 to-orange-500",
      preview: "#fffbeb",
      badge: "HERO B",
    },
    {
      id: "v3-hero-c",
      name: "V3 - Combined Trust",
      description: "Ultra-minimal with trust bar",
      color: "from-yellow-500 to-orange-500",
      preview: "#fffbeb",
      badge: "HERO C",
    },
  ];

  // Only show in development mode
  const isDev = import.meta.env.DEV;

  if (!isDev) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
        title="Switch Homepage Variation (Dev Only)"
      >
        <Palette className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          DEV
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Panel Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-clash">
                    Homepage Variations
                  </h2>
                  <p className="text-sm text-white/80 mt-1">
                    Choose your preferred design
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Dev Mode:</strong> This panel is only visible in
                    development. Use it to quickly switch between homepage
                    designs.
                  </p>
                </div>

                {/* Current Variation */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-900 font-semibold mb-1">
                    Currently Active:
                  </p>
                  <p className="text-xl font-bold text-purple-700 font-clash">
                    {
                      variations.find((v) => v.id === currentVariation)?.name
                    }
                  </p>
                </div>

                {/* Variation Cards */}
                <div className="space-y-3">
                  {variations.map((variation) => (
                    <motion.button
                      key={variation.id}
                      onClick={() => {
                        onVariationChange(variation.id);
                        setIsOpen(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                        currentVariation === variation.id
                          ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-200/50"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                      }`}
                    >
                      {/* Color Preview */}
                      <div className="flex items-start gap-4">
                        <div
                          className="w-16 h-16 rounded-xl flex-shrink-0 shadow-md"
                          style={{
                            background:
                              variation.id === "v3"
                                ? `linear-gradient(135deg, ${variation.preview} 0%, #f8f9ff 100%)`
                                : variation.preview,
                            border:
                              variation.id === "v3"
                                ? "2px solid #e5e5e5"
                                : "none",
                          }}
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-clash text-lg font-bold text-gray-900">
                              {variation.name}
                            </h3>
                            {variation.badge && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">
                                {variation.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {variation.description}
                          </p>

                          {currentVariation === variation.id && (
                            <div className="mt-2 inline-flex items-center gap-1 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              Active
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gradient Badge */}
                      <div
                        className={`mt-3 h-2 rounded-full bg-gradient-to-r ${variation.color}`}
                      ></div>
                    </motion.button>
                  ))}
                </div>

                {/* Info Footer */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    How to use:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Click any variation to switch designs</li>
                    <li>• Your choice is saved in localStorage</li>
                    <li>
                      • Use URL param: <code>/?variation=v2</code>
                    </li>
                    <li>• This panel won't appear in production</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VariationSwitcher;
