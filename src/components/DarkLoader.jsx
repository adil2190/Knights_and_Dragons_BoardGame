import React from "react";

const DarkLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`spinner-border animate-spin border-gray-700 border-r-transparent inline-block w-12 h-12 border-2 rounded-full`}
        role="status"
      >
        {/* <span className="visually-hidden"></span> */}
      </div>
    </div>
  );
};

export default DarkLoader;
