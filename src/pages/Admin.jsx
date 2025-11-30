import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { useFetchOffers } from '../hooks/useFetchOffers'
import Button from '../components/Button'

/**
 * Admin Dashboard Component
 * Manages Categories, Products, and Offers
 */
const Admin = () => {
    const { user, loading: authLoading, login, logout } = useAuth()
    const { categories, refetch: refetchCategories } = useFetchCategories()
    const { products, refetch: refetchProducts } = useFetchProducts()
    const { offers, refetch: refetchOffers } = useFetchOffers()

    const [activeTab, setActiveTab] = useState('categories')
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({})

    // Login form state
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginError('')

        const success = login(loginUsername, loginPassword)
        if (!success) {
            setLoginError('Ungültige Anmeldedaten')
            setLoginPassword('')
        }
    }

    // Loading state
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

    // Login form
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-cream">
                <div className="card p-8 md:p-12 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">🔒</div>
                        <h2 className="text-3xl font-semibold text-primary mb-2">Admin Login</h2>
                        <p className="text-gray-600">
                            Bitte melden Sie sich an, um auf das Admin-Dashboard zuzugreifen.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {loginError}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block font-medium mb-2">
                                Benutzername
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className="input-field"
                                placeholder="admin"
                                required
                                autoFocus
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium mb-2">
                                Passwort
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button type="submit" variant="primary" className="w-full">
                            Anmelden
                        </Button>

                        <p className="text-sm text-gray-500 text-center mt-4">
                            Standard: admin / admin123
                        </p>
                    </form>
                </div>
            </div>
        )
    }

    // Handle Category Submit
    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingItem
                ? '/.netlify/functions/updateCategory'
                : '/.netlify/functions/createCategory'

            const method = editingItem ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Kategorie erfolgreich gespeichert!')
                setEditingItem(null)
                setFormData({})
                refetchCategories()
            } else {
                const error = await response.json()
                alert('Fehler: ' + (error.details || error.error))
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    // Handle Product Submit
    const handleProductSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingItem
                ? '/.netlify/functions/updateProduct'
                : '/.netlify/functions/createProduct'

            const method = editingItem ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Produkt erfolgreich gespeichert!')
                setEditingItem(null)
                setFormData({})
                refetchProducts()
            } else {
                const error = await response.json()
                alert('Fehler: ' + (error.details || error.error))
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    // Handle Offer Submit
    const handleOfferSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingItem
                ? '/.netlify/functions/updateOffer'
                : '/.netlify/functions/createOffer'

            const method = editingItem ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert('Angebot erfolgreich gespeichert!')
                setEditingItem(null)
                setFormData({})
                refetchOffers()
            } else {
                const error = await response.json()
                alert('Fehler: ' + (error.details || error.error))
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Fehler bei der Kommunikation mit dem Server')
        }
    }

    // Handle Delete
    const handleDelete = async (type, id) => {
        if (!confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')) {
            return
        }

        try {
            const urls = {
                category: `/.netlify/functions/deleteCategory?id=${id}`,
                product: `/.netlify/functions/deleteProduct?id=${id}`,
                offer: `/.netlify/functions/deleteOffer?id=${id}`
            }

            const response = await fetch(urls[type], { method: 'DELETE' })

            if (response.ok) {
                alert('Erfolgreich gelöscht!')
                if (type === 'category') refetchCategories()
                else if (type === 'product') refetchProducts()
                else refetchOffers()
            } else {
                const error = await response.json()
                alert('Fehler: ' + (error.details || error.error))
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
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">⚙️</div>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Abmelden
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-8">
                    <div className="flex border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors whitespace-nowrap ${activeTab === 'categories'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            Kategorien ({categories.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors whitespace-nowrap ${activeTab === 'products'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            Produkte ({products.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('offers')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors whitespace-nowrap ${activeTab === 'offers'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            Angebote ({offers.length})
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* CATEGORIES TAB */}
                        {activeTab === 'categories' && (
                            <CategoryTab
                                categories={categories}
                                formData={formData}
                                setFormData={setFormData}
                                editingItem={editingItem}
                                setEditingItem={setEditingItem}
                                handleSubmit={handleCategorySubmit}
                                handleDelete={handleDelete}
                            />
                        )}

                        {/* PRODUCTS TAB */}
                        {activeTab === 'products' && (
                            <ProductTab
                                products={products}
                                categories={categories}
                                formData={formData}
                                setFormData={setFormData}
                                editingItem={editingItem}
                                setEditingItem={setEditingItem}
                                handleSubmit={handleProductSubmit}
                                handleDelete={handleDelete}
                            />
                        )}

                        {/* OFFERS TAB */}
                        {activeTab === 'offers' && (
                            <OfferTab
                                offers={offers}
                                products={products}
                                formData={formData}
                                setFormData={setFormData}
                                editingItem={editingItem}
                                setEditingItem={setEditingItem}
                                handleSubmit={handleOfferSubmit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Category Tab Component
const CategoryTab = ({ categories, formData, setFormData, editingItem, setEditingItem, handleSubmit, handleDelete }) => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Kategorie-Verwaltung</h2>
            <Button
                onClick={() => {
                    setEditingItem(null)
                    setFormData({ name: '', slug: '', short_description: '', icon: '', image: '' })
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="category-name"
                        placeholder="Name"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        required
                    />
                    <input
                        type="text"
                        name="category-slug"
                        placeholder="Slug (z.B. frisches-obst)"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="input-field"
                        required
                    />
                    <textarea
                        name="category-description"
                        placeholder="Kurzbeschreibung"
                        value={formData.short_description || ''}
                        onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                        className="input-field"
                        rows="3"
                        required
                    />
                    <input
                        type="text"
                        name="category-icon"
                        placeholder="Icon (Emoji)"
                        value={formData.icon || ''}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="input-field"
                        required
                    />
                    <input
                        type="url"
                        name="category-image"
                        placeholder="Bild-URL (optional)"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="input-field"
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

// Offer Tab Component
                const OfferTab = ({offers, products, formData, setFormData, editingItem, setEditingItem, handleSubmit, handleDelete}) => (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Angebots-Verwaltung</h2>
                        <Button
                            onClick={() => {
                                setEditingItem(null)
                                setFormData({
                                    product_id: products[0]?.id || '',
                                    new_price: '',
                                    valid_until: ''
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
                                        <span className="font-bold text-primary">€{parseFloat(offer.price).toFixed(2)}</span>
                                        <span className="ml-2 line-through text-gray-400">€{parseFloat(offer.old_price).toFixed(2)}</span>
                                        <span className="ml-2 text-green-600">-{offer.discount_percent}%</span>
                                        <span className="ml-2 text-gray-500">• Gültig bis {new Date(offer.valid_until).toLocaleDateString('de-DE')}</span>
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingItem(offer)
                                            setFormData({
                                                id: offer.id,
                                                product_id: offer.product_id,
                                                new_price: offer.price,
                                                valid_until: offer.valid_until
                                            })
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
                    {formData.product_id !== undefined && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingItem ? 'Angebot bearbeiten' : 'Neues Angebot erstellen'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <select
                                    name="offer-product"
                                    value={formData.product_id || ''}
                                    onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                                    className="input-field"
                                    required
                                >
                                    <option value="">Produkt wählen</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} (€{parseFloat(product.price).toFixed(2)})
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="offer-new-price"
                                    placeholder="Neuer reduzierter Preis (€)"
                                    value={formData.new_price || ''}
                                    onChange={(e) => setFormData({ ...formData, new_price: e.target.value })}
                                    className="input-field"
                                    required
                                />
                                <input
                                    type="date"
                                    name="offer-valid-until"
                                    value={formData.valid_until || ''}
                                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
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
                )

                export default Admin
