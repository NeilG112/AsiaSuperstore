import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import CategoryCard from '../components/CategoryCard'
import { useFetchCategories } from '../hooks/useFetchCategories'

/**
 * Products Page Component
 * Display all product categories
 */
const Products = () => {
    const [searchParams] = useSearchParams()
    const { categories, loading } = useFetchCategories()
    const [filteredCategories, setFilteredCategories] = useState([])

    const categoryFilter = searchParams.get('category')

    useEffect(() => {
        if (categoryFilter) {
            setFilteredCategories(
                categories.filter(cat => cat.slug === categoryFilter)
            )
        } else {
            setFilteredCategories(categories)
        }
    }, [categories, categoryFilter])

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title="Unsere Produkte"
                    subtitle="Entdecken Sie unsere vielfältige Auswahl an authentischen asiatischen Lebensmitteln"
                />

                {categoryFilter && (
                    <div className="mb-8 text-center">
                        <span className="inline-block bg-primary text-white px-4 py-2 rounded-full">
                            Filter: {categoryFilter}
                        </span>
                        <button
                            onClick={() => window.location.href = '/produkte'}
                            className="ml-4 text-primary hover:text-primary-light underline"
                        >
                            Filter entfernen
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-6 text-gray-600 text-lg">Laden...</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">Keine Kategorien gefunden.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-16 bg-white rounded-xl shadow-md p-8 md:p-12 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-semibold text-primary mb-4 text-center">
                        Warum bei uns einkaufen?
                    </h3>
                    <p className="text-center text-gray-700 leading-relaxed">
                        Alle unsere Produkte werden sorgfältig ausgewählt und regelmäßig auf Qualität geprüft.
                        Wir arbeiten eng mit vertrauenswürdigen Lieferanten zusammen, um Ihnen stets
                        frische und authentische Lebensmittel anbieten zu können.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Products
