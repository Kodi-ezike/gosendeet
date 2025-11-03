import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ServiceTier {
  name: string;
  description: string;
  deliveryTime: string;
  startingPrice: string;
  features: {
    label: string;
    included: boolean | string;
  }[];
  popular?: boolean;
}

const ServiceComparison = () => {
  const navigate = useNavigate();

  // Static service tiers (can be made dynamic with API later)
  const serviceTiers: ServiceTier[] = [
    {
      name: "Economy",
      description: "Best for non-urgent deliveries",
      deliveryTime: "3-5 business days",
      startingPrice: "25",
      features: [
        { label: "Real-time Tracking", included: true },
        { label: "Insurance Coverage", included: "$100" },
        { label: "Priority Support", included: false },
        { label: "Weekend Delivery", included: false },
        { label: "Same-Day Pickup", included: false },
        { label: "White Glove Service", included: false },
      ],
    },
    {
      name: "Standard",
      description: "Perfect for most deliveries",
      deliveryTime: "2-3 business days",
      startingPrice: "45",
      popular: true,
      features: [
        { label: "Real-time Tracking", included: true },
        { label: "Insurance Coverage", included: "$500" },
        { label: "Priority Support", included: true },
        { label: "Weekend Delivery", included: true },
        { label: "Same-Day Pickup", included: false },
        { label: "White Glove Service", included: false },
      ],
    },
    {
      name: "Express",
      description: "For urgent deliveries",
      deliveryTime: "Same/Next day",
      startingPrice: "85",
      features: [
        { label: "Real-time Tracking", included: true },
        { label: "Insurance Coverage", included: "$1000" },
        { label: "Priority Support", included: true },
        { label: "Weekend Delivery", included: true },
        { label: "Same-Day Pickup", included: true },
        { label: "White Glove Service", included: true },
      ],
    },
  ];

  const handleGetQuote = () => {
    // Navigate to homepage with the tier pre-selected (can be enhanced)
    navigate("/");
    // Optionally scroll to booking form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="md:px-20 px-6 py-20 bg-gradient-to-b from-white via-neutral100/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-clash xl:text-[56px] lg:text-[48px] text-[40px] font-bold mb-4 text-[#1a1a1a]">
            Choose Your <span className="gradient-text">Service Tier</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto xl:text-xl lg:text-lg text-base">
            Select the perfect delivery speed and service level for your needs.
            All tiers include real-time tracking and insurance coverage.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {serviceTiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative bg-white rounded-3xl p-8 border transition-all duration-500 group
                ${tier.popular
                  ? "border-transparent shadow-2xl hover:shadow-3xl hover:-translate-y-2 ring-2 ring-purple400/50"
                  : "border-[#f0f0f0] shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-purple200"
                }
              `}
            >
              {/* Gradient overlay for popular tier */}
              {tier.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple400/5 via-blue400/5 to-green400/5 rounded-3xl pointer-events-none"></div>
              )}

              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-purple400 to-blue400 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-6 mt-2 relative z-10">
                <h3 className={`font-clash text-3xl font-bold mb-2 ${tier.popular ? "bg-gradient-to-r from-purple700 to-blue400 bg-clip-text text-transparent" : "text-[#1a1a1a]"}`}>
                  {tier.name}
                </h3>
                <p className="text-[#6b7280] text-sm mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-6xl font-bold ${tier.popular ? "bg-gradient-to-r from-purple700 to-blue400 bg-clip-text text-transparent" : "text-[#1a1a1a]"}`}>
                    ${tier.startingPrice}
                  </span>
                  <span className="text-[#6b7280] ml-2 text-base block mt-1">starting price</span>
                </div>

                {/* Delivery Time Badge */}
                <div className={`inline-block px-5 py-2.5 rounded-full text-sm font-semibold ${tier.popular ? "bg-gradient-to-r from-purple400 to-blue400 text-white shadow-md" : "bg-[#f5f5f5] text-[#1a1a1a] border border-[#e5e5e5]"}`}>
                  {tier.deliveryTime}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 mt-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {typeof feature.included === "boolean" ? (
                      feature.included ? (
                        <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-[#9ca3af] flex-shrink-0 mt-0.5" />
                      )
                    ) : (
                      <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included === false
                          ? "text-[#9ca3af]"
                          : "text-[#374151]"
                      }`}
                    >
                      {feature.label}
                      {typeof feature.included === "string" && (
                        <span className="font-semibold text-[#1a1a1a] ml-1">
                          ({feature.included})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full text-white font-semibold py-6 shadow-lg transition-all duration-300 relative z-10 ${
                  tier.popular
                    ? "bg-gradient-to-r from-purple400 to-blue400 hover:from-purple500 hover:to-blue500 hover:-translate-y-0.5 shadow-purple400/30"
                    : "bg-purple400 hover:bg-purple500 hover:-translate-y-0.5"
                }`}
                onClick={handleGetQuote}
              >
                Get a Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#6b7280] mb-4 text-lg">
            Not sure which tier is right for you?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/cost-calculator")}
            className="hover:-translate-y-0.5 transition-transform duration-300"
          >
            Compare All Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceComparison;
