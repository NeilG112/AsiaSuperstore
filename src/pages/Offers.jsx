import SectionHeader from '../components/SectionHeader'
import OfferCard from '../components/OfferCard'
import { useFetchOffers } from '../hooks/useFetchOffers'

/**
 * Offers Page Component
 * Display all weekly offers
 */
const Offers = () => {
    const { offers, loading } = useFetchOffers()

    // Filter out expired offers
    const activeOffers = offers.filter(offer => {
        const validDate = new Date(offer.valid_until)
        return validDate >= new Date()
    })

    // Sort by valid_until date
    const sortedOffers = [...activeOffers].sort((a, b) => {
        return new Date(a.valid_until) - new Date(b.valid_until)
    })

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title="Wöchentliche Angebote"
                    subtitle="Profitieren Sie von unseren aktuellen Sonderangeboten und sparen Sie bei hochwertigen Produkten"
                />

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-6 text-gray-600 text-lg">Laden...</p>
                    </div>
                ) : sortedOffers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-md">
                        <p className="text-2xl text-gray-600 mb-4">
                            Aktuell keine Angebote verfügbar.
                        </p>
                        <p className="text-gray-500">
                            Schauen Sie bald wieder vorbei für neue Sonderangebote!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <p className="text-lg text-gray-700">
                                <span className="font-semibold text-primary">{sortedOffers.length}</span> aktuelle{' '}
                                {sortedOffers.length === 1 ? 'Angebot' : 'Angebote'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedOffers.map((offer) => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    </>
                )}

                {/* Info Banner */}
                <div className="mt-16 gradient-primary text-white rounded-xl p-8 md:p-12 text-center">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                        Verpassen Sie keine Angebote!
                    </h3>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        Besuchen Sie uns regelmäßig für neue wöchentliche Angebote.
                        Alle Preise sind gültig solange der Vorrat reicht.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <div className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Hochwertige Produkte</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Faire Preise</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Wöchentlich neue Angebote</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offers
