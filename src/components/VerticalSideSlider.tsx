import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

const sliderImages = [
    "/assets/slider/fashion-clothes.png",
    "/assets/slider/floral-candle.jpg",
    "/assets/slider/embroidery-hoop.jpg",
    "/assets/slider/cat-embroidery.jpg",
    "/assets/slider/crochet-keychains.jpg"
];

// Explicitly export the props interface
export interface VerticalSideSliderProps {
    containerRef?: RefObject<HTMLElement | null>;
}

export const VerticalSideSlider = ({ containerRef }: VerticalSideSliderProps) => {
    // If containerRef is provided, track progress within that container. 
    // Otherwise, fallback to page scroll
    const { scrollYProgress } = useScroll({
        target: containerRef || undefined,
        offset: ["start start", "end end"]
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            // Finish cycling through images by 85% of the scroll container
            const cycleEnd = 0.85;
            const effectiveProgress = Math.min(latest / cycleEnd, 1);

            const newIndex = Math.min(
                Math.floor(effectiveProgress * sliderImages.length),
                sliderImages.length - 1
            );

            setCurrentIndex(newIndex);
        });

        return () => unsubscribe();
    }, [smoothProgress]);

    return (
        <>
            {/* Mobile/Tablet: Stacked below content (Relative) */}
            <div className="lg:hidden w-full h-[400px] mt-12 rounded-2xl overflow-hidden relative shadow-2xl border-4 border-white/50">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={sliderImages[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                </AnimatePresence>
                {/* Mobile Counter */}
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-brand-cream px-3 py-1 rounded-full text-sm font-serif">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(sliderImages.length).padStart(2, '0')}
                </div>
            </div>

            {/* Desktop: Relative positioned within sticky container */}
            <div className="hidden lg:block relative z-40 w-[300px] h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/80 ring-1 ring-brand-terracotta/20">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                        key={currentIndex}
                        src={sliderImages[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/40 to-transparent pointer-events-none" />

                {/* Slide Counter Indicator */}
                <div className="absolute top-6 right-6 bg-brand-brown/40 backdrop-blur-md text-brand-cream px-4 py-1.5 rounded-full text-sm font-serif border border-brand-cream/20 tracking-widest shadow-lg">
                    {String(currentIndex + 1).padStart(2, '0')} <span className="text-brand-cream/60 mx-1">/</span> {String(sliderImages.length).padStart(2, '0')}
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    {sliderImages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand-cream' : 'w-2 bg-brand-cream/40'}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
