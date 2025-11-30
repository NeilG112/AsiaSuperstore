/**
 * Offer Card Component
 * Displays weekly offers with pricing and validity
 */
const OfferCard = ({ offer }) => {
    const { title, description, price, old_price, valid_until, image } = offer

    // Ensure prices are numbers
    const currentPrice = parseFloat(price) || 0
    const oldPrice = old_price ? parseFloat(old_price) : null

    // Calculate discount percentage
    const discountPercent = oldPrice && oldPrice > 0
        ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
        : 0

    // Format date
    const validDate = new Date(valid_until).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    return (
        <div className="card">
            {/* Image Section */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🏷️
                    </div>
                )}

                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 badge badge-offer">
                        -{discountPercent}%
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5">
                <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-4">{description}</p>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-bold text-primary">
                        €{currentPrice.toFixed(2)}
                    </span>
                    {oldPrice && (
                        <span className="text-lg text-gray-400 line-through">
                            €{oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Validity */}
                <p className="text-xs text-gray-500">
                    Gültig bis: {validDate}
                </p>
            </div>
        </div>
    )
}

export default OfferCard
