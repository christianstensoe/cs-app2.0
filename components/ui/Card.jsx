import { motion } from "framer-motion";
import { hoverScale } from "@/lib/animations";

export default function Card({
  children,
  className = "",
  hoverable = true,
  ...props
}) {
  return (
    <motion.div
      {...(hoverable ? hoverScale : {})}
      className={`
        relative overflow-hidden
        bg-white dark:bg-gray-800
        rounded-xl p-6
        shadow-lg
        border border-gray-100 dark:border-gray-700
        backdrop-blur-sm
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-transparent before:to-gray-100/10 dark:before:to-gray-700/10
        before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
