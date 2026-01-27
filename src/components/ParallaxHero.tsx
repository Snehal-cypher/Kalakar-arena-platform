// app/components/ParallaxHero.tsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ParallaxHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax animation
    gsap.to(svgRef.current, {
      y: () => -ScrollTrigger.maxScroll(window) * 0.3, // Subtle effect
      ease: "none",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5">
      {/* SVG Background with Parallax */}
      <svg 
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full opacity-30"
        viewBox="0 0 1200 800" 
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Using your maroon colors */}
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--maroon-400))" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2"/>
          </linearGradient>
          
          <radialGradient id="shapeGrad">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
          </radialGradient>
          
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
          </filter>
        </defs>
        
        {/* Background */}
        <rect width="1200" height="800" fill="url(#grad1)"/>
        
        {/* Artistic shapes matching Kalakar Arena theme */}
        {/* Brush stroke effect */}
        <path d="M100,200 Q300,150 500,250 T900,200 L1000,400 L100,400 Z" 
              fill="hsl(var(--maroon-300))" opacity="0.1" filter="url(#softBlur)"/>
        
        {/* Palette circles */}
        <circle cx="300" cy="300" r="60" fill="url(#shapeGrad)" filter="url(#softBlur)"/>
        <circle cx="800" cy="400" r="80" fill="url(#shapeGrad)" filter="url(#softBlur)"/>
        <circle cx="500" cy="600" r="70" fill="url(#shapeGrad)" filter="url(#softBlur)"/>
        
        {/* Paint splatter effect */}
        <ellipse cx="200" cy="500" rx="40" ry="25" transform="rotate(30 200 500)"
                fill="hsl(var(--maroon-200))" opacity="0.08" filter="url(#softBlur)"/>
        <ellipse cx="900" cy="250" rx="35" ry="50" transform="rotate(-20 900 250)"
                fill="hsl(var(--primary))" opacity="0.07" filter="url(#softBlur)"/>
      </svg>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in">
            Where Artistry Meets <span className="text-primary">Opportunity</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-200">
            KALAKAR ARENA connects you with talented local artists, fashion designers, 
            home bakers, jewelry makers, and artisans. Discover unique, handcrafted 
            creations or showcase your creative journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg">
              Find Creators
            </button>
            <button className="px-8 py-3 bg-background text-foreground border-2 border-primary rounded-full font-semibold text-lg hover:bg-accent transition-all duration-300 hover:scale-105 shadow-sm">
              Join as Creator
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}