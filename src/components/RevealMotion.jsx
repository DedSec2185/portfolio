import React, { useRef, useState, useEffect } from "react";

export default function RevealMotion({
  children,
  motionType = "fadeUp",
  delay = 0,
  style = {},
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bidirectional: updates when scrolling down AND when scrolling back up
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "-20px 0px -20px 0px",
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const motionStyles = {
    fadeUp: {
      hidden: { opacity: 0, transform: "translateY(36px) scale(0.97)" },
      visible: { opacity: 1, transform: "translateY(0) scale(1)" },
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    slideLeft: {
      hidden: { opacity: 0, transform: "translateX(-45px) rotate(-1.5deg) scale(0.96)" },
      visible: { opacity: 1, transform: "translateX(0) rotate(0deg) scale(1)" },
      transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    slideRight: {
      hidden: { opacity: 0, transform: "translateX(45px) rotate(1.5deg) scale(0.96)" },
      visible: { opacity: 1, transform: "translateX(0) rotate(0deg) scale(1)" },
      transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
    scaleUp: {
      hidden: { opacity: 0, transform: "scale(0.88) translateY(24px)" },
      visible: { opacity: 1, transform: "scale(1) translateY(0)" },
      transition: `opacity 0.65s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}ms, transform 0.65s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}ms`,
    },
    flip3D: {
      hidden: { opacity: 0, transform: "perspective(800px) rotateX(20deg) translateY(35px)" },
      visible: { opacity: 1, transform: "perspective(800px) rotateX(0deg) translateY(0)" },
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
  };

  const selected = motionStyles[motionType] || motionStyles.fadeUp;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(visible ? selected.visible : selected.hidden),
        transition: selected.transition,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
