
import { useEffect, useRef } from "react";
import fashion from "../assets/creative-bg/fashion.png";
import baking from "../assets/creative-bg/baking.png";
import jewelry from "../assets/creative-bg/jewelry.png";
import embroidery from "../assets/creative-bg/embroidery.png";
import candle from "../assets/creative-bg/candle.png";
import photography from "../assets/creative-bg/photography.png";

const images = [fashion, baking, jewelry, embroidery, candle, photography];

export const ScrollingBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Render multiple rows for better coverage */}
        {[0, 1, 2].map((rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full whitespace-nowrap"
            style={{
              transform: rowIndex % 2 === 0 ? "rotate(0deg)" : "rotate(0deg)", // Can add slight rotation if needed
            }}
          >
            {/* Inner container for animation */}
            <div
              className={`flex ${rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"}`}
              style={{
                animationDuration: "60s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {[...images, ...images, ...images].map((src, index) => (
                <div
                  key={`${rowIndex}-${index}`}
                  className="w-64 h-64 md:w-96 md:h-96 flex-shrink-0 p-8"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-contain filter grayscale sepia opacity-50 hover:opacity-100 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div
              className={`flex ${rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"}`}
              style={{
                animationDuration: "60s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {[...images, ...images, ...images].map((src, index) => (
                <div
                  key={`dup-${rowIndex}-${index}`}
                  className="w-64 h-64 md:w-96 md:h-96 flex-shrink-0 p-8"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-contain filter grayscale sepia opacity-50 hover:opacity-100 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-[1px]"></div>
    </div>
  );
};
