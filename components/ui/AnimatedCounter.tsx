"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  displayValue?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  displayValue,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted =
    count >= 1000 ? count.toLocaleString() : String(count);

  const showPlus = displayValue?.includes("+");

  return (
    <span ref={ref}>
      {formatted}
      {showPlus && count >= value ? "+" : ""}
      {suffix}
    </span>
  );
}
