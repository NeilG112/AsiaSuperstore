import { useState, useEffect } from 'react'
import categoriesData from '../data/categories.json'

const API_URL = '/.netlify/functions'

export const useFetchCategories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategories = async () => {
        try {
            setLoading(true)
            setError(null)

            // Try to fetch from Netlify Function
            const response = await fetch(`${API_URL}/getCategories`)

            if (!response.ok) {
                throw new Error('Failed to fetch from API')
            }

            const data = await response.json()
            setCategories(data)
        } catch (err) {
            console.warn('API fetch failed, using local data:', err.message)
            // Fallback to local JSON data
            setCategories(categoriesData)
            setError(null) // Don't show error when fallback works
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return { categories, loading, error, refetch: fetchCategories }
}
