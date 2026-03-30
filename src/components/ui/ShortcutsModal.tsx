"use client";
import React from "react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal = ({ isOpen, onClose }: ShortcutsModalProps) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "Ctrl/Cmd + 1", action: "Dashboard" },
    { key: "Ctrl/Cmd + 2", action: "Activities" },
    { key: "Ctrl/Cmd + 3", action: "Tips" },
    { key: "Ctrl/Cmd + 4", action: "Goals" },
    { key: "Ctrl/Cmd + 5", action: "Badges" },
    { key: "?", action: "Show help" },
    { key: "Esc", action: "Close modals" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            aria-label="Close"
          >
            X
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
            >
              <span className="text-black">{shortcut.action}</span>
              <kbd className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm font-mono text-black">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
