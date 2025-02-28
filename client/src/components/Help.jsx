import React, { useState } from 'react';

const Help = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setOpen(!open)}
      >
        Help & Support
      </button>

      {open && (
        <div className="mt-3 bg-white shadow-lg rounded-lg p-4 max-w-xs">
          <h2 className="text-lg font-bold mb-2">How can we help?</h2>
          <p className="text-sm text-gray-600 mb-3">
            For support, please email us at <span className="font-bold">support@example.com</span>
          </p>
          <button
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Help;
