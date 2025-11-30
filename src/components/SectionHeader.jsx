import React from "react";

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">{title}</h2>
    {subtitle && <p className="text-lg text-dark/70">{subtitle}</p>}
  </div>
);

export default SectionHeader;
