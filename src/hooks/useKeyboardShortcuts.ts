import React, { useEffect } from "react";

type PageType = "dashboard" | "activities" | "tips" | "goals" | "badges";

interface KeyboardShortcutsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  setShowShortcutsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useKeyboardShortcuts = ({
  setCurrentPage,
  setShowShortcutsModal,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcutsModal(true);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setShowShortcutsModal(false);
        return;
      }

      const isModifierPressed = e.ctrlKey || e.metaKey;
      if (!isModifierPressed) return;

      switch (e.key) {
        case "1":
          e.preventDefault();
          setCurrentPage("dashboard");
          break;
        case "2":
          e.preventDefault();
          setCurrentPage("activities");
          break;
        case "3":
          e.preventDefault();
          setCurrentPage("tips");
          break;
        case "4":
          e.preventDefault();
          setCurrentPage("goals");
          break;
        case "5":
          e.preventDefault();
          setCurrentPage("badges");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setCurrentPage, setShowShortcutsModal]);
};
