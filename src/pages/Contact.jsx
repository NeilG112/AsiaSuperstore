import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

/**
 * Contact Page Component
 * Contact information and form
 */
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // For now, just show success message
        // In production, this would integrate with Netlify Forms
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title="Kontakt"
                    subtitle="Nehmen Sie Kontakt mit uns auf - wir helfen Ihnen gerne weiter"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="card p-8">
                            <h3 className="text-2xl font-semibold text-primary mb-6">
                                Kontaktinformationen
                            </h3>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">📧</span>
                                    <div>
                                        <h4 className="font-semibold mb-1">E-Mail</h4>
                                        <a
                                            href="mailto:info@asiansuperstore.de"
                                            className="text-primary hover:text-primary-light transition-colors"
                                        >
                                            info@asiansuperstore.de
                                        </a>
                                    </div>
                                </div>

                                {/* Phone Kronenhof */}
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">📞</span>
                                    <div>
                                        <h4 className="font-semibold mb-1">Kronenhof</h4>
                                        <a
                                            href="tel:+4971112345"
                                            className="text-primary hover:text-primary-light transition-colors"
                                        >
                                            +49 711 123456
                                        </a>
                                    </div>
                                </div>

                                {/* Phone Pliensau */}
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">📞</span>
                                    <div>
                                        <h4 className="font-semibold mb-1">Pliensaustraße</h4>
                                        <a
                                            href="tel:+49711654321"
                                            className="text-primary hover:text-primary-light transition-colors"
                                        >
                                            +49 711 654321
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start">
                                    <span className="text-3xl mr-4">📍</span>
                                    <div>
                                        <h4 className="font-semibold mb-1">Unsere Standorte</h4>
                                        <p className="text-gray-700">Am Kronenhof 17, 73728 Esslingen</p>
                                        <p className="text-gray-700">Pliensaustraße 42, 73728 Esslingen</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="card p-8">
                            <h3 className="text-2xl font-semibold text-primary mb-6">
                                Öffnungszeiten
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between">
                                    <span className="font-medium">Montag - Freitag:</span>
                                    <span>9:00 - 20:00 Uhr</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Samstag:</span>
                                    <span>9:00 - 18:00 Uhr</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-red-600">Sonntag:</span>
                                    <span className="text-red-600">Geschlossen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card p-8">
                        <h3 className="text-2xl font-semibold text-primary mb-6">
                            Nachricht senden
                        </h3>

                        {submitted && (
                            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                                Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block font-medium mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Ihr Name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block font-medium mb-2">
                                    E-Mail *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="ihre.email@beispiel.de"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block font-medium mb-2">
                                    Betreff *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Worum geht es?"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block font-medium mb-2">
                                    Nachricht *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="input-field resize-none"
                                    placeholder="Ihre Nachricht..."
                                />
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" variant="primary" className="w-full">
                                Nachricht senden
                            </Button>

                            <p className="text-sm text-gray-500 text-center">
                                * Pflichtfelder
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
