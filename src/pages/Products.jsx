import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import CategoryCard from '../components/CategoryCard'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { useFetchProducts } from '../hooks/useFetchProducts'

/**
 * Products Page Component
 * Display all product categories
 */
const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { categories, loading: categoriesLoading } = useFetchCategories()
    const { products, loading: productsLoading } = useFetchProducts()

    const categorySlug = searchParams.get('category')
    const activeCategory = categories.find(c => c.slug === categorySlug)

    const filteredProducts = activeCategory
        ? products.filter(p => p.category_id === activeCategory.id)
        : []

    const loading = categoriesLoading || productsLoading

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title={activeCategory ? activeCategory.name : "Unsere Produkte"}
                    subtitle={activeCategory ? activeCategory.short_description : "Entdecken Sie unsere vielfältige Auswahl an authentischen asiatischen Lebensmitteln"}
                />

                {activeCategory && (
                    <div className="mb-8">
                        <button
                            onClick={() => setSearchParams({})}
                            className="flex items-center text-primary hover:text-primary-light font-medium transition-colors"
                        >
                            ← Zurück zur Übersicht
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-6 text-gray-600 text-lg">Laden...</p>
                    </div>
                ) : activeCategory ? (
                    // Product List View
                    <div>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                <p className="text-xl text-gray-600">Noch keine Produkte in dieser Kategorie.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        {product.image && (
                                            <div className="h-48 overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
                                                <span className="font-bold text-lg text-primary">€{parseFloat(product.price).toFixed(2)}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                            {!product.in_stock && (
                                                <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                                                    Nicht vorrätig
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    // Category List View
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}

                {/* Info Section - Only show on overview */}
                {!activeCategory && (
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
                )}
            </div>
        </div>
    )
}

export default Products
