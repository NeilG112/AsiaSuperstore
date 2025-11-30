import { useState, useEffect } from 'react'

export const useFetchSettings = () => {
    const [settings, setSettings] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchSettings = async () => {
        try {
            setLoading(true)
            const response = await fetch('/.netlify/functions/getSettings')
            if (!response.ok) throw new Error('Failed to fetch settings')
            const data = await response.json()

            // Convert array to object for easier access
            const settingsObj = data.reduce((acc, item) => {
                acc[item.key] = item.value
                return acc
            }, {})

            setSettings(settingsObj)
        } catch (err) {
            setError(err.message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    return { settings, loading, error, refetch: fetchSettings }
}
