import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Navigation Bar Component
 * Responsive navbar with mobile menu
 */
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()
    const { user, logout } = useAuth()

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/ueber', label: 'Über Uns' },
        { path: '/produkte', label: 'Produkte' },
        { path: '/angebote', label: 'Angebote' },
        { path: '/standorte', label: 'Standorte' },
        { path: '/kontakt', label: 'Kontakt' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-3xl">🌏</span>
                        <div className="flex flex-col">
                            <span className="text-2xl font-heading font-bold text-primary">
                                Asian Superstore
                            </span>
                            <span className="text-xs text-gray-600 -mt-1">
                                Bringt die Welt zusammen
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors duration-200 ${isActive(link.path)
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-gray-700 hover:text-primary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Admin Link */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/admin"
                                    className="text-accent font-medium hover:text-primary transition-colors"
                                >
                                    Admin
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-600 hover:text-primary"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${isActive(link.path)
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user && (
                                <>
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-4 py-2 text-accent font-medium hover:bg-gray-100 rounded-lg"
                                    >
                                        Admin
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout()
                                            setIsMenuOpen(false)
                                        }}
                                        className="px-4 py-2 text-left text-gray-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
