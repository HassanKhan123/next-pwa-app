import React, { useRef } from "react";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCancel();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white border-[0.5px] border-white/30 p-6 rounded-lg shadow-lg max-w-[400px] w-full mx-4"
      >
        <p className="text-lg">Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md bg-slate-800 py-1.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-800 py-1.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-600 focus:shadow-none active:bg-red-700 hover:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
