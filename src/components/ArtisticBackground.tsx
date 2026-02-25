import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg1 from '../assets/artistic-bg/bg1.png';
import bg2 from '../assets/artistic-bg/bg2.png';
import bg3 from '../assets/artistic-bg/bg3.png';
import bg4 from '../assets/artistic-bg/bg4.png';
import bg5 from '../assets/artistic-bg/bg5.png';
import bg6 from '../assets/artistic-bg/bg6.jpg';
import bg7 from '../assets/artistic-bg/bg7.jpg';
import bg8 from '../assets/artistic-bg/bg8.jpg';

const artisticImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

export const ArtisticBackground = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % artisticImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0" // Full screen
                >
                    <img
                        src={artisticImages[index]}
                        alt="Artistic Background"
                        className="w-full h-full object-cover filter contrast-[1.1] brightness-[1.1] mix-blend-multiply opacity-100"
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        </div>
    );
};
