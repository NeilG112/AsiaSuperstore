import { useState, useEffect } from 'react'
import offersData from '../data/offers.json'

const API_URL = '/.netlify/functions'

export const useFetchOffers = () => {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchOffers = async () => {
        try {
            setLoading(true)
            setError(null)

            // Try to fetch from Netlify Function
            const response = await fetch(`${API_URL}/getOffers`)

            if (!response.ok) {
                throw new Error('Failed to fetch from API')
            }

            const data = await response.json()
            setOffers(data)
        } catch (err) {
            console.warn('API fetch failed, using local data:', err.message)
            // Fallback to local JSON data
            setOffers(offersData)
            setError(null) // Don't show error when fallback works
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOffers()
    }, [])

    return { offers, loading, error, refetch: fetchOffers }
}
