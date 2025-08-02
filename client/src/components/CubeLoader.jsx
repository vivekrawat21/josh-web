import { motion } from "framer-motion";

const CubeLoader = ({ size = "md", color = "#3b82f6" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.8,
            transform: "translateZ(20px)",
          }}
        />
        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.8,
            transform: "rotateY(180deg) translateZ(20px)",
          }}
        />
        {/* Left face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.9,
            transform: "rotateY(-90deg) translateZ(20px)",
          }}
        />
        {/* Right face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.9,
            transform: "rotateY(90deg) translateZ(20px)",
          }}
        />
        {/* Top face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.7,
            transform: "rotateX(90deg) translateZ(20px)",
          }}
        />
        {/* Bottom face */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: color,
            opacity: 0.7,
            transform: "rotateX(-90deg) translateZ(20px)",
          }}
        />
      </motion.div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default CubeLoader