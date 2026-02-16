"use client";

import { ReactNode, useEffect, useCallback } from "react";
import { FocusScope } from "react-aria";
import { AnimatePresence, motion } from "motion/react";

export interface FullscreenOverlayProps {
  /** Whether the overlay is open */
  isOpen: boolean;
  /** Called when the overlay requests to close (ESC key) */
  onClose?: () => void;
  /** Content to render inside the overlay */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Background class, defaults to "bg-primary" */
  bg?: string;
  /** Enable close on ESC key, defaults to false */
  closeOnEscape?: boolean;
  /** Enable animations, defaults to true */
  animate?: boolean;
}

export function FullscreenOverlay({
  isOpen,
  onClose,
  children,
  className = "",
  bg = "bg-primary",
  closeOnEscape = false,
  animate = true,
}: FullscreenOverlayProps) {
  // Block body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // ESC key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape" && onClose) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const content = (
    <motion.div
      key="fullscreen-overlay"
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={animate ? { opacity: 0 } : undefined}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-0 z-50 flex flex-col overflow-auto ${bg} ${className}`}
    >
      <FocusScope contain restoreFocus autoFocus>
        {children}
      </FocusScope>
    </motion.div>
  );

  if (animate) {
    return <AnimatePresence>{isOpen && content}</AnimatePresence>;
  }

  return isOpen ? content : null;
}
