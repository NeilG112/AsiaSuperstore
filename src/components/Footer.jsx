import { Link } from 'react-router-dom'

/**
 * Footer Component
 * Site-wide footer with links and contact info
 */
const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark text-white mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Branding */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-3xl">🌏</span>
                            <span className="text-2xl font-heading font-bold text-primary-light">
                                Asian Superstore
                            </span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Bringt die Welt zusammen – Ihre erste Adresse für frische asiatische Lebensmittel in Esslingen.
                        </p>
                        <p className="text-sm text-gray-400">
                            Halal • Frisch • Multikulturell
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-light">Schnelllinks</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-primary-light transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/ueber" className="text-gray-300 hover:text-primary-light transition-colors">
                                    Über Uns
                                </Link>
                            </li>
                            <li>
                                <Link to="/produkte" className="text-gray-300 hover:text-primary-light transition-colors">
                                    Produkte
                                </Link>
                            </li>
                            <li>
                                <Link to="/angebote" className="text-gray-300 hover:text-primary-light transition-colors">
                                    Angebote
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-light">Kontakt</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-2">📍</span>
                                <div>
                                    <p>Am Kronenhof 17</p>
                                    <p>73728 Esslingen</p>
                                </div>
                            </li>
                            <li className="flex items-start mt-3">
                                <span className="mr-2">📍</span>
                                <div>
                                    <p>Pliensaustraße 42</p>
                                    <p>73728 Esslingen</p>
                                </div>
                            </li>
                            <li className="flex items-center mt-3">
                                <span className="mr-2">📧</span>
                                <a href="mailto:info@asiansuperstore.de" className="hover:text-primary-light transition-colors">
                                    info@asiansuperstore.de
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {currentYear} Asian Superstore. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
