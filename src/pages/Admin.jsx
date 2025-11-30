import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { useFetchOffers } from '../hooks/useFetchOffers'
import Button from '../components/Button'

/**
 * Admin Dashboard Component
 * Manage categories and offers with CRUD operations
 */
const Admin = () => {
    const { user, loading: authLoading, login } = useAuth()
    const { categories, refetch: refetchCategories } = useFetchCategories()
    const { offers, refetch: refetchOffers } = useFetchOffers()

    const [activeTab, setActiveTab] = useState('categories')
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({})

    // Redirect if not authenticated
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-cream">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Laden...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-cream">
                <div className="card p-8 md:p-12 max-w-md w-full text-center">
                    <div className="text-6xl mb-6">🔒</div>
                    <h2 className="text-3xl font-semibold text-primary mb-4">Admin Login</h2>
                    <p className="text-gray-600 mb-8">
                        Bitte melden Sie sich an, um auf das Admin-Dashboard zuzugreifen.
                    </p>
                    <Button onClick={login} variant="primary" className="w-full">
                        Mit Netlify Identity anmelden
                    </Button>
                </div>
            </div>
        )
    }

    // Handle form submission for categories
    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingItem
                ? '/.netlify/functions/updateCategory'
                : '/.netlify/functions/createCategory'

            const method = editingItem ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Kategorie erfolgreich gespeichert!')
                setEditingItem(null)
                setFormData({})
                refetchCategories()
            } else {
                alert('Fehler beim Speichern der Kategorie')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    // Handle form submission for offers
    const handleOfferSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingItem
                ? '/.netlify/functions/updateOffer'
                : '/.netlify/functions/createOffer'

            const method = editingItem ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Angebot erfolgreich gespeichert!')
                setEditingItem(null)
                setFormData({})
                refetchOffers()
            } else {
                alert('Fehler beim Speichern des Angebots')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    // Handle delete
    const handleDelete = async (type, id) => {
        if (!confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')) {
            return
        }

        try {
            const url = type === 'category'
                ? `/.netlify/functions/deleteCategory?id=${id}`
                : `/.netlify/functions/deleteOffer?id=${id}`

            const response = await fetch(url, { method: 'DELETE' })

            if (response.ok) {
                alert('Erfolgreich gelöscht!')
                if (type === 'category') {
                    refetchCategories()
                } else {
                    refetchOffers()
                }
            } else {
                alert('Fehler beim Löschen')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    return (
        <div className="py-16 md:py-20 bg-secondary-cream min-h-screen">
            <div className="container-custom max-w-7xl">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
                            <p className="text-gray-600">Willkommen, {user.email}</p>
                        </div>
                        <div className="text-4xl">⚙️</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-8">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === 'categories'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            Kategorien ({categories.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('offers')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === 'offers'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            Angebote ({offers.length})
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'categories' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Kategorie-Verwaltung</h2>
                                    <Button
                                        onClick={() => {
                                            setEditingItem(null)
                                            setFormData({ name: '', slug: '', short_description: '', icon: '' })
                                        }}
                                    >
                                        + Neue Kategorie
                                    </Button>
                                </div>

                                {/* Categories List */}
                                <div className="grid gap-4 mb-8">
                                    {categories.map((category) => (
                                        <div key={category.id} className="border rounded-lg p-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl">{category.icon}</span>
                                                <div>
                                                    <h3 className="font-semibold">{category.name}</h3>
                                                    <p className="text-sm text-gray-600">{category.short_description}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(category)
                                                        setFormData(category)
                                                    }}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                    Bearbeiten
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('category', category.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Löschen
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Category Form */}
                                {formData.name !== undefined && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold mb-4">
                                            {editingItem ? 'Kategorie bearbeiten' : 'Neue Kategorie erstellen'}
                                        </h3>
                                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Slug (z.B. frisches-obst)"
                                                value={formData.slug || ''}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                            <textarea
                                                placeholder="Kurzbeschreibung"
                                                value={formData.short_description || ''}
                                                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                                className="input-field"
                                                rows="3"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Icon (Emoji oder URL)"
                                                value={formData.icon || ''}
                                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                            <div className="flex gap-4">
                                                <Button type="submit" variant="primary">Speichern</Button>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setEditingItem(null)
                                                        setFormData({})
                                                    }}
                                                >
                                                    Abbrechen
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'offers' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold">Angebots-Verwaltung</h2>
                                    <Button
                                        onClick={() => {
                                            setEditingItem(null)
                                            setFormData({
                                                title: '',
                                                description: '',
                                                price: '',
                                                old_price: '',
                                                valid_until: '',
                                                category_id: categories[0]?.id || ''
                                            })
                                        }}
                                    >
                                        + Neues Angebot
                                    </Button>
                                </div>

                                {/* Offers List */}
                                <div className="grid gap-4 mb-8">
                                    {offers.map((offer) => (
                                        <div key={offer.id} className="border rounded-lg p-4 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold">{offer.title}</h3>
                                                <p className="text-sm text-gray-600">{offer.description}</p>
                                                <p className="text-sm mt-2">
                                                    <span className="font-bold text-primary">€{offer.price}</span>
                                                    {offer.old_price && (
                                                        <span className="ml-2 line-through text-gray-400">€{offer.old_price}</span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(offer)
                                                        setFormData(offer)
                                                    }}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                    Bearbeiten
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('offer', offer.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Löschen
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Offer Form */}
                                {formData.title !== undefined && (
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold mb-4">
                                            {editingItem ? 'Angebot bearbeiten' : 'Neues Angebot erstellen'}
                                        </h3>
                                        <form onSubmit={handleOfferSubmit} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Titel"
                                                value={formData.title || ''}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                            <textarea
                                                placeholder="Beschreibung"
                                                value={formData.description || ''}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="input-field"
                                                rows="3"
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Preis"
                                                    value={formData.price || ''}
                                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                    className="input-field"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Alter Preis"
                                                    value={formData.old_price || ''}
                                                    onChange={(e) => setFormData({ ...formData, old_price: parseFloat(e.target.value) })}
                                                    className="input-field"
                                                />
                                            </div>
                                            <input
                                                type="date"
                                                value={formData.valid_until || ''}
                                                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                            <select
                                                value={formData.category_id || ''}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                className="input-field"
                                                required
                                            >
                                                <option value="">Kategorie wählen</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <div className="flex gap-4">
                                                <Button type="submit" variant="primary">Speichern</Button>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setEditingItem(null)
                                                        setFormData({})
                                                    }}
                                                >
                                                    Abbrechen
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
