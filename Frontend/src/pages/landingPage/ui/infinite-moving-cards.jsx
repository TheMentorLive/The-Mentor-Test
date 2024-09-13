import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone all items to ensure infinite scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      setStart(true);
    }
  }

  const getSpeed = () => {
    if (speed === "fast") {
      return "20s";
    } else if (speed === "normal") {
      return "80s";
    } else {
      return "50s"; // Adjusted to a slower speed
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden w-full max-w-screen",
        "[mask-image:linear-gradient(to_right,transparent,white_5%,white_90%,transparent)]", // Reduced glow effect
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-full flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          "--animation-duration": getSpeed(),
          "--animation-direction": direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map((item, idx) => (
          <li
            className="w-full sm:w-[250px] md:w-[350px] lg:w-[450px] flex-shrink-0 bg-blue-500 text-white rounded-2xl border px-4 md:px-8 py-6"
            key={idx}
          >
            <blockquote>
              <div className="flex items-start gap-4">
                
                <div className="flex flex-col">
                  
                  <span className="text-sm leading-[1.6]">{item.quote}</span>
                  <div className="mt-2 flex items-center gap-2 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <span className="text-sm leading-[1.6] text-gray-300">{item.name}</span><br/>
                      <span className="text-sm leading-[1.6] text-gray-300">{item.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
