import React from "react";

const OfferCard = ({ title, description, price, old_price, image, validUntil }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-40 object-cover object-center"
    />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="font-display text-xl font-bold text-primary mb-1">{title}</h3>
        <p className="text-dark/80 mb-2">{description}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col">
          {old_price && <span className="text-sm text-gray-400 line-through">{old_price}</span>}
          <span className="font-semibold text-lg text-secondary">{price}</span>
        </div>
        <span className="text-xs text-dark/50">Gültig bis {validUntil}</span>
      </div>
    </div>
  </div>
);

export default OfferCard;
