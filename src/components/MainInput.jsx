import React from "react";

function MainInput({ inputLabel, isRtl, notRequired, ...otherProps }) {
  return (
    <div className="mr-2 my-1 w-full">
      <label
        htmlFor="first-name"
        className={`block text-sm mb-1 ml-1 text-gray-700 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        {inputLabel} {notRequired ? "" : "*"}
      </label>
      <div className="mt-1">
        <input
          {...otherProps}
          required
          className="main_input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default MainInput;
