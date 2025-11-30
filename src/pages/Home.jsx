import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import CategoryCard from '../components/CategoryCard'
import OfferCard from '../components/OfferCard'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { useFetchOffers } from '../hooks/useFetchOffers'

/**
 * Home Page Component
 * Hero section, categories preview, offers preview, locations preview
 */
const Home = () => {
    const { categories, loading: categoriesLoading } = useFetchCategories()
    const { offers, loading: offersLoading } = useFetchOffers()

    // Get first 6 categories and 6 offers for preview
    const previewCategories = categories.slice(0, 6)
    const previewOffers = offers.slice(0, 6)

    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-primary text-white py-20 md:py-32">
                <div className="container-custom text-center">
                    <h1 className="text-shadow mb-6">
                        Bringt die Welt zusammen
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-shadow">
                        Entdecken Sie authentische asiatische Lebensmittel in Esslingen.
                        Frisch, Halal und Multikulturell.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button to="/produkte" variant="secondary">
                            Unsere Produkte
                        </Button>
                        <Button to="/angebote" variant="primary" className="bg-white text-primary hover:bg-gray-100">
                            Wöchentliche Angebote
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-primary mb-6">Wer wir sind</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Asian Superstore ist Ihr vertrauenswürdiger Partner für frische, authentische asiatische Lebensmittel
                            in Esslingen. Wir bieten eine vielfältige Auswahl an Produkten aus verschiedenen asiatischen Kulturen,
                            alle sorgfältig ausgewählt für höchste Qualität und Frische.
                        </p>
                        <Button to="/ueber">
                            Mehr über uns
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-16 md:py-20 bg-secondary-cream">
                <div className="container-custom">
                    <SectionHeader
                        title="Unsere Produktkategorien"
                        subtitle="Entdecken Sie unsere vielfältige Auswahl an frischen Lebensmitteln"
                    />

                    {categoriesLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Laden...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {previewCategories.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>
                    )}

                    <div className="text-center">
                        <Button to="/produkte">
                            Alle Kategorien ansehen
                        </Button>
                    </div>
                </div>
            </section>

            {/* Offers Preview */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container-custom">
                    <SectionHeader
                        title="Wöchentliche Angebote"
                        subtitle="Sparen Sie bei unseren aktuellen Sonderangeboten"
                    />

                    {offersLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Laden...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {previewOffers.map((offer) => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    )}

                    <div className="text-center">
                        <Button to="/angebote">
                            Alle Angebote ansehen
                        </Button>
                    </div>
                </div>
            </section>

            {/* Locations Preview */}
            <section className="py-16 md:py-20 bg-secondary-beige">
                <div className="container-custom">
                    <SectionHeader
                        title="Unsere Standorte"
                        subtitle="Besuchen Sie uns in Esslingen"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                        <div className="card p-6">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="text-xl font-semibold mb-3">Kronenhof</h3>
                            <p className="text-gray-700">Am Kronenhof 17</p>
                            <p className="text-gray-700 mb-4">73728 Esslingen</p>
                        </div>

                        <div className="card p-6">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="text-xl font-semibold mb-3">Pliensaustraße</h3>
                            <p className="text-gray-700">Pliensaustraße 42</p>
                            <p className="text-gray-700 mb-4">73728 Esslingen</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button to="/standorte">
                            Mehr Informationen
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="gradient-accent text-dark py-16">
                <div className="container-custom text-center">
                    <h2 className="mb-6">Besuchen Sie uns noch heute!</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Erleben Sie die Vielfalt asiatischer Küche. Wir freuen uns auf Ihren Besuch!
                    </p>
                    <Button to="/kontakt" variant="primary">
                        Kontakt aufnehmen
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Home
