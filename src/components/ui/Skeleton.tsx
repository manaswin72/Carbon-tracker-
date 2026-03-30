"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={clsx(
      "relative overflow-hidden rounded-md bg-gray-200",
      className
    )}
  >
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
    />
  </div>
);

//  Circular Skeleton
export const CircularSkeleton: React.FC<{ size?: number }> = ({
  size = 200,
}) => (
  <motion.div
    className="relative rounded-full bg-gray-200 overflow-hidden"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
  >
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_#e5e7eb_0deg,_#f3f4f6_90deg,_#e5e7eb_180deg,_#f3f4f6_270deg,_#e5e7eb_360deg)] opacity-80" />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    />
  </motion.div>
);
