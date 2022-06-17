import React from "react";

function MainButton({ label, ...props }) {
  return (
    <button
      {...props}
      className="bg-[#f9c802] text-[#fff] rounded-md min-w-[150px] py-[5px] my-[5px]"
      style={{ boxShadow: "rgba(249, 200, 2, 0.24) 0px 5px 8px" }}
    >
      {label}
    </button>
  );
}

export default MainButton;
