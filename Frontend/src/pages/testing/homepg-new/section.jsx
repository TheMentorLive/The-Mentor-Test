import React, { useState, useEffect, useRef } from "react";

const ScrollCard = ({ title, description, image, isActive }) => (
  <div
    className={`absolute w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-700 ${
      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
    }`}
    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
  >
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const FixedScrollSection = ({ title, cards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef();

  const handleScroll = (e) => {
    if (!isActive) return; // Only handle scroll inside the section
    const deltaY = e.deltaY;

    // Allow default scroll behavior when all cards are done
    if (currentCard === cards.length - 1 && deltaY > 0) {
      return;
    }
    if (currentCard === 0 && deltaY < 0) {
      return;
    }

    e.preventDefault();

    if (deltaY > 0 && currentCard < cards.length - 1) {
      setCurrentCard((prev) => prev + 1); // Scroll down
    } else if (deltaY < 0 && currentCard > 0) {
      setCurrentCard((prev) => prev - 1); // Scroll up
    }
  };

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", handleScroll);
    }
    return () => window.removeEventListener("wheel", handleScroll);
  }, [isActive, currentCard]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen bg-gray-50 flex items-center justify-center overflow-hidden"
    >
      <h2 className="absolute top-10 text-3xl font-bold">{title}</h2>
      {cards.map((card, index) => (
        <ScrollCard key={index} isActive={index === currentCard} {...card} />
      ))}
    </div>
  );
};

const App = () => {
  const cards = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "API & Bulk Payouts",
      description: "Make multiple payouts with a single click from your dashboard.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Source to Pay",
      description: "Control and optimize vendor payments with an integrated solution.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Payout Links",
      description: "Share payout links for instant payments, no bank details needed.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Tax Payments",
      description: "Online tax payments in a single click.",
    },
  ];

  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-blue-500">
        <h1 className="text-4xl text-white">Welcome to the Page</h1>
      </div>
      <FixedScrollSection title="Make Payouts" cards={cards} />
      <div className="h-screen flex items-center justify-center bg-green-500">
        <h1 className="text-4xl text-white">End of Section</h1>
      </div>
    </div>
  );
};

export default App;
