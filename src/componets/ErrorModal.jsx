import React from "react";

const Modal = ({ isOpen, onClose, message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 bg-opacity-70 absolute inset-0"></div>
          <div className="bg-gray-600 rounded-lg p-8 z-10">
            <p className="text-white">{message}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
