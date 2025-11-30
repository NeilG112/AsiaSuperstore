/**
 * Section Header Component
 * Consistent section headers across the site
 */
const SectionHeader = ({ title, subtitle, centered = true }) => {
    return (
        <div className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''}`}>
            <h2 className="text-primary mb-3">{title}</h2>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default SectionHeader
