"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProbabilityGaugeProps {
  probability: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  showAnimation?: boolean;
}

export function ProbabilityGauge({
  probability,
  size = "lg",
  label = "Snow Day Probability",
  showAnimation = true,
}: ProbabilityGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (showAnimation) {
      const duration = 1500;
      const steps = 60;
      const increment = probability / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= probability) {
          setAnimatedValue(probability);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setAnimatedValue(probability);
    }
  }, [probability, showAnimation]);

  const sizeConfig = {
    sm: { width: 120, stroke: 8, fontSize: "text-2xl" },
    md: { width: 180, stroke: 10, fontSize: "text-4xl" },
    lg: { width: 260, stroke: 14, fontSize: "text-6xl" },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 70) return "stroke-success";
    if (value >= 40) return "stroke-warning";
    return "stroke-muted-foreground";
  };

  const getTextColor = (value: number) => {
    if (value >= 70) return "text-success";
    if (value >= 40) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg
          className="-rotate-90 transform"
          width={config.width}
          height={config.width}
        >
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(getColor(animatedValue), "transition-all duration-300")}
            style={{
              filter: animatedValue >= 70 ? "drop-shadow(0 0 8px oklch(0.65 0.18 145 / 0.5))" : "none",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(config.fontSize, "font-bold font-mono", getTextColor(animatedValue))}>
            {animatedValue}%
          </span>
          {size === "lg" && (
            <span className="text-sm text-muted-foreground mt-1">probability</span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
