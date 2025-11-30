import { Link } from 'react-router-dom'

/**
 * Category Card Component
 * Displays product category with icon and description
 */
const CategoryCard = ({ category }) => {
    const { name, slug, short_description, icon } = category

    return (
        <Link to={`/produkte?category=${slug}`} className="card group">
            <div className="p-6">
                {/* Icon */}
                <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {icon}
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary-light transition-colors">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                    {short_description}
                </p>
            </div>
        </Link>
    )
}

export default CategoryCard
