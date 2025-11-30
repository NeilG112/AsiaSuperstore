import SectionHeader from '../components/SectionHeader'

/**
 * About Page Component
 * Company philosophy and values
 */
const About = () => {
    return (
        <div className="py-16 md:py-20 bg-secondary-cream">
            <div className="container-custom">
                <SectionHeader
                    title="Über Asian Superstore"
                    subtitle="Ihre erste Adresse für authentische asiatische Lebensmittel"
                />

                <div className="max-w-4xl mx-auto">
                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
                        <h3 className="text-2xl font-semibold text-primary mb-6">
                            Unsere Philosophie
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Bei Asian Superstore glauben wir daran, dass Essen Menschen zusammenbringt.
                            Unsere Mission ist es, die kulinarische Vielfalt Asiens nach Esslingen zu bringen
                            und unseren Kunden Zugang zu authentischen, hochwertigen Lebensmitteln zu ermöglichen.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Seit unserer Gründung legen wir größten Wert auf Frische, Qualität und kulturelle Authentizität.
                            Jedes Produkt in unserem Sortiment wird sorgfältig ausgewählt, um sicherzustellen,
                            dass Sie das beste Einkaufserlebnis haben.
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card p-6 text-center">
                            <div className="text-5xl mb-4">🌱</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">Frisch</h3>
                            <p className="text-gray-600">
                                Täglich frische Produkte direkt von ausgewählten Lieferanten
                            </p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">Halal</h3>
                            <p className="text-gray-600">
                                Breite Auswahl an zertifizierten Halal-Produkten
                            </p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="text-5xl mb-4">🌏</div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">Multikulturell</h3>
                            <p className="text-gray-600">
                                Produkte aus verschiedenen asiatischen Kulturen unter einem Dach
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-primary text-white rounded-xl p-8 md:p-12 mt-8">
                        <h3 className="text-2xl font-semibold mb-4">
                            Was uns auszeichnet
                        </h3>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Große Auswahl an frischen Obst und Gemüse</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Authentische Gewürze und Saucen aus ganz Asien</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Vielfältige Reis- und Nudelsorten</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Freundliche und kompetente Beratung</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Faire Preise und regelmäßige Angebote</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3">✓</span>
                                <span>Zwei praktische Standorte in Esslingen</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
