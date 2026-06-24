"use client";

import { useEffect } from "react";

export default function TouchRipple() {
  useEffect(() => {
    let isTouch = false;

    const handlePress = (e: TouchEvent | MouseEvent) => {
      // Determine if touch or mouse interaction
      if (e.type === "touchstart") {
        isTouch = true;
      } else if (e.type === "mousedown" && isTouch) {
        // Prevent double triggers on touch devices
        return;
      }

      const target = e.target as HTMLElement;
      // Target button elements, elements with class .button, or role="button"
      const button = target.closest("button, .button, [role='button']") as HTMLElement;

      if (!button || button.hasAttribute("disabled") || button.getAttribute("aria-disabled") === "true") {
        return;
      }

      // Check if button is already undergoing a press
      if (button.classList.contains("button-press-active")) {
        return;
      }

      // 1. Ensure the button has positioning and clipping
      const computedStyle = window.getComputedStyle(button);
      const position = computedStyle.position;
      if (position !== "relative" && position !== "absolute" && position !== "fixed") {
        button.style.position = "relative";
      }

      const overflow = computedStyle.overflow;
      if (overflow !== "hidden") {
        button.style.overflow = "hidden";
      }

      // 2. Get click coordinates relative to button bounds
      const rect = button.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // 3. Calculate radius to cover the furthest corner
      const dx = Math.max(x, rect.width - x);
      const dy = Math.max(y, rect.height - y);
      const radius = Math.sqrt(dx * dx + dy * dy);
      const size = radius * 2;

      // 4. Create ripple element
      const ripple = document.createElement("span");
      ripple.className = "touch-ripple-wave";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - radius}px`;
      ripple.style.top = `${y - radius}px`;

      // Append ripple to button
      button.appendChild(ripple);

      // Force reflow/layout recalculation to ensure the initial scale(0) is applied before transitions
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ripple.offsetWidth;

      // Start expansion animation
      ripple.classList.add("ripple-active");

      // 5. Add iOS-style tactile press shrink
      button.classList.add("button-press-active");

      let released = false;

      const cleanup = () => {
        if (released) return;
        released = true;

        // Restore normal button scale
        button.classList.remove("button-press-active");

        // Start ripple fade-out transition
        ripple.classList.add("ripple-out");

        // Remove ripple element after opacity transition completes
        setTimeout(() => {
          if (ripple.parentNode === button) {
            button.removeChild(ripple);
          }
        }, 250);
      };

      // Listen for release events
      const releaseEvents = e.type === "touchstart"
        ? ["touchend", "touchcancel"]
        : ["mouseup", "mouseleave"];

      const handleRelease = () => {
        cleanup();
        releaseEvents.forEach((evtName) => {
          document.removeEventListener(evtName, handleRelease);
        });
      };

      releaseEvents.forEach((evtName) => {
        document.addEventListener(evtName, handleRelease, { passive: true });
      });
    };

    const handleTouchEndReset = () => {
      // Clear isTouch flag after a small delay to handle hybrid desktop browsers
      setTimeout(() => {
        isTouch = false;
      }, 500);
    };

    document.addEventListener("touchstart", handlePress, { passive: true });
    document.addEventListener("mousedown", handlePress, { passive: true });
    document.addEventListener("touchend", handleTouchEndReset, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handlePress);
      document.removeEventListener("mousedown", handlePress);
      document.removeEventListener("touchend", handleTouchEndReset);
    };
  }, []);

  return null;
}
