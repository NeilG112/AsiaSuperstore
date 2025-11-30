import SectionHeader from '../components/SectionHeader'

/**
 * Locations Page Component
 * Store locations and contact information
 */
const Locations = () => {
    const locations = [
        {
            id: 'kronenhof',
            name: 'Asian Superstore Kronenhof',
            address: 'Am Kronenhof 17',
            city: '73728 Esslingen',
            phone: '+49 711 123456',
            hours: {
                weekdays: 'Mo-Fr: 9:00 - 20:00 Uhr',
                saturday: 'Sa: 9:00 - 18:00 Uhr',
                sunday: 'So: Geschlossen'
            }
        },
        {
            id: 'pliensau',
            name: 'Asian Superstore Pliensaustraße',
            address: 'Pliensaustraße 42',
            city: '73728 Esslingen',
            phone: '+49 711 654321',
            hours: {
                weekdays: 'Mo-Fr: 9:00 - 20:00 Uhr',
                saturday: 'Sa: 9:00 - 18:00 Uhr',
                sunday: 'So: Geschlossen'
            }
        }
    ]

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title="Unsere Standorte"
                    subtitle="Besuchen Sie uns an einem unserer beiden Standorte in Esslingen"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {locations.map((location) => (
                        <div key={location.id} className="card">
                            {/* Header */}
                            <div className="gradient-primary text-white p-6">
                                <div className="text-5xl mb-3">📍</div>
                                <h3 className="text-2xl font-semibold">{location.name}</h3>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Address */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-lg mb-2 text-primary">Adresse</h4>
                                    <p className="text-gray-700">{location.address}</p>
                                    <p className="text-gray-700">{location.city}</p>
                                </div>

                                {/* Phone */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-lg mb-2 text-primary">Telefon</h4>
                                    <a
                                        href={`tel:${location.phone}`}
                                        className="text-gray-700 hover:text-primary transition-colors"
                                    >
                                        {location.phone}
                                    </a>
                                </div>

                                {/* Opening Hours */}
                                <div>
                                    <h4 className="font-semibold text-lg mb-2 text-primary">Öffnungszeiten</h4>
                                    <div className="space-y-1 text-gray-700">
                                        <p>{location.hours.weekdays}</p>
                                        <p>{location.hours.saturday}</p>
                                        <p className="text-red-600">{location.hours.sunday}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Link */}
                            <div className="px-6 pb-6">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address + ', ' + location.city)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full text-center block"
                                >
                                    Auf Google Maps anzeigen
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-white rounded-xl shadow-md p-8 md:p-12 max-w-3xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold text-primary mb-4">
                        Wir freuen uns auf Ihren Besuch!
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Beide Filialen bieten Ihnen die gleiche hochwertige Auswahl an frischen
                        asiatischen Lebensmitteln. Unser freundliches Team steht Ihnen gerne
                        für Fragen und Beratung zur Verfügung.
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">🅿️</span>
                            <span>Parkplätze verfügbar</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">♿</span>
                            <span>Barrierefrei</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">💳</span>
                            <span>Kartenzahlung möglich</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Locations
