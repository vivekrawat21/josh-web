import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Loader = () =>{
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360)
        }, 20)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex bg-transparent items-center justify-center min-h-[200px] w-full">
        <div className="relative">
            {/* Main spinning circle */}
            <motion.div
            className="w-20 h-20 rounded-full border-t-4 border-r-4 border-orange-500 shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Inner spinning circle (opposite direction) */}
            <motion.div
            className="absolute top-2 left-2 w-16 h-16 rounded-full border-b-4 border-l-4 border-orange-300"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Center pulsing dot */}
            <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-md"
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                "0 0 0 0 rgba(255, 153, 0, 0.7)",
                "0 0 0 10px rgba(255, 153, 0, 0)",
                "0 0 0 0 rgba(255, 153, 0, 0)",
                ],
            }}
            transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
            />

            {/* Orbiting particles */}
            {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-300 rounded-full"
                style={{
                originX: "0",
                originY: "0",
                }}
                animate={{
                x: Math.cos(((rotation + i * 45) * Math.PI) / 180) * 45,
                y: Math.sin(((rotation + i * 45) * Math.PI) / 180) * 45,
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8],
                }}
                transition={{
                opacity: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                }}
            />
            ))}

            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-200/20 via-orange-300/10 to-orange-200/20 animate-pulse" />
        </div>
        </div>
    )
}

export default Loader