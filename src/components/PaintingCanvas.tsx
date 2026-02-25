import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const PaintingCanvas = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const brushRef = useRef<HTMLDivElement>(null);
    const paintingRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Check if we are on the landing page (has categories-section)
            const categoriesSection = document.getElementById("categories-section");

            // 1. Visibility Trigger
            // If categories section exists, trigger on it. If not (About page), show immediately.
            if (categoriesSection) {
                ScrollTrigger.create({
                    trigger: categoriesSection,
                    start: "top center",
                    end: "bottom bottom",
                    onEnter: () => gsap.to(canvasRef.current, { opacity: 1, x: 0, duration: 0.5 }),
                    onLeaveBack: () => gsap.to(canvasRef.current, { opacity: 0, x: -50, duration: 0.5 }),
                });
            } else {
                // About Page or others: Fade in immediately
                gsap.to(canvasRef.current, { opacity: 1, x: 0, duration: 1, delay: 0.5 });
            }

            // 2. Painting Animation: Linked to scroll strictly AFTER it becomes visible
            // We use a separate timeline that starts painting relatively
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });

            // Reveal painting
            tl.to(paintingRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
                duration: 10,
            });

            // Animate brush
            if (brushRef.current) {
                gsap.set(brushRef.current, { x: 0, y: 0, rotation: -10 });

                const brushTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.5,
                    },
                });

                // Loop strokes
                for (let i = 0; i < 10; i++) {
                    brushTl.to(brushRef.current, {
                        x: 200, y: "+=30", rotation: 10, duration: 0.5, ease: "power1.inOut"
                    }).to(brushRef.current, {
                        x: 0, y: "+=30", rotation: -10, duration: 0.5, ease: "power1.inOut"
                    });
                }
            }
        }, canvasRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={canvasRef}
            className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 opacity-0 -translate-x-12" // Start hidden and shifted
        >
            {/* Palette Icon */}
            <div className="bg-white/80 p-3 rounded-full shadow-lg border border-primary/20 backdrop-blur-sm animate-bounce-slow">
                <Palette className="w-8 h-8 text-primary" />
            </div>

            {/* The Canvas Frame */}
            <div className="relative w-64 h-80 bg-[#FDF6F3] rounded-lg shadow-2xl border-8 border-[#4E2C2A] overflow-hidden box-border">
                {/* The "Blank" Canvas */}
                <div className="absolute inset-0 bg-white" />

                {/* The Painting - Using a more reliable artistic image */}
                <img
                    ref={paintingRef}
                    src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop" // Reliable Book/Art image
                    alt="Masterpiece"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
                />

                {/* The Paint Brush */}
                <div
                    ref={brushRef}
                    className="absolute -top-4 -left-4 w-12 h-12 pointer-events-none drop-shadow-xl z-50 text-4xl"
                >
                    🖌️
                </div>
            </div>

            <div className="px-3 py-1 bg-white/60 rounded-full text-xs font-serif text-primary italic border border-primary/10">
                Creating Masterpiece...
            </div>
        </div>
    );
};
