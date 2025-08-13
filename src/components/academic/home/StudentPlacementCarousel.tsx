import { useState, useEffect, useRef } from "react";

const companies = [
  { id: 1, name: "Public Service Commission", subtitle: "लोक सेवा आयोग", logo: "/logos/psc.png" },
  { id: 2, name: "Google", subtitle: "Tech giant", logo: "/logos/google.png" },
  { id: 3, name: "Facebook", subtitle: "Social media", logo: "/logos/facebook.png" },
  { id: 4, name: "Amazon", subtitle: "E-commerce", logo: "/logos/amazon.png" },
  { id: 5, name: "Microsoft", subtitle: "Software", logo: "/logos/microsoft.png" },
  { id: 6, name: "Apple", subtitle: "Hardware & Software", logo: "/logos/apple.png" },
  { id: 7, name: "Netflix", subtitle: "Streaming", logo: "/logos/netflix.png" },
  { id: 8, name: "Tesla", subtitle: "Electric cars", logo: "/logos/tesla.png" },
];

export default function StudentPlacementCarousel() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    function updateCardWidth() {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    }
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    if (cardWidth === 0) return;

    const totalCards = companies.length;
    const totalScrollWidth = cardWidth * totalCards;

    const interval = setInterval(() => {
      setTranslateX((prev) => {
        let next = prev + cardWidth;

        if (next >= totalScrollWidth) {
          next = 0;
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [cardWidth]);

  return (
    <div className="w-full bg-gray-50 py-9 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-auto">
          <div
            ref={containerRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${companies.length * 2 * cardWidth}px`, // double width for loop
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                ref={index === 0 ? cardRef : null} // measure first card width only
                className="flex-shrink-0 px-3"
                style={{ width: 200 /* fallback width */ }}
              >
                <div className="rounded-lg shadow flex items-center space-x-4 px-4 py-3 cursor-pointer hover:shadow-md transition-shadow duration-300">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-800 text-xs font-semibold">{company.name}</h3>
                    <p className="text-gray-500 text-xs">{company.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
