import { React } from 'react';
import { motion } from 'framer-motion';

const HeroBackground = () => {
    return (
        <div className="relative w-full h-screen -top-10">
            {/* Background Image */}
            <motion.img
                src="/arrow_pattern1.svg" 
                alt="Arrow Pattern 1"
                className="absolute top-10 left-40 w-[20%] h-[20%] object-contain opacity-20"
                initial={{ x: "-15vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <motion.img
                src="/arrow_pattern2.svg" 
                alt="Arrow Pattern 2"
                className="absolute top-60 left-0 w-[18%] h-[18%] object-contain opacity-20"
                initial={{ x: "-15vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            <motion.img
                src="/arrow_pattern3.svg" 
                alt="Arrow Pattern 2"
                className="absolute top-[80%] left-0 w-[18%] h-[18%] object-contain opacity-20"
                initial={{ x: "-15vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <motion.img
                src="/arrow_pattern4.svg" 
                alt="Arrow Pattern 2"
                className="absolute top-60 right-0 w-[20%] h-[20%] object-contain opacity-20"
                initial={{ x: "5vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <motion.img
                src="/arrow_pattern5.svg" 
                alt="Arrow Pattern 2"
                className="absolute top-[60%] right-0 w-[20%] h-[20%] object-contain opacity-20"
                initial={{ x: "5vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <motion.img
                src="/Hero bg line.svg" 
                alt="Hero Background Line"
                className="absolute top-0 -left-32 w-[90%] h-auto object-cover opacity-20"
                initial={{ x: "-30vw", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

        </div>
    );
}

export default HeroBackground;
