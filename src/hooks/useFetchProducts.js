import { useState, useEffect } from 'react'

export const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/.netlify/functions/getProducts')

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            setProducts(data)
            setError(null)
        } catch (err) {
            console.error('Error fetching products:', err)
            setError(err.message)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return { products, loading, error, refetch: fetchProducts }
}
