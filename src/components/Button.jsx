import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-5 py-2 rounded bg-primary text-white font-semibold hover:bg-secondary hover:text-dark transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
