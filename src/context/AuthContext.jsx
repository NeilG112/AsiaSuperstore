import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem('admin_logged_in')
        if (storedUser === 'true') {
            setUser({ email: 'admin' })
        }
        setLoading(false)
    }, [])

    const login = (username, password) => {
        // Hardcoded credentials - in production, use environment variables
        const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin'
        const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem('admin_logged_in', 'true')
            setUser({ email: username })
            return true
        }
        return false
    }

    const logout = () => {
        localStorage.removeItem('admin_logged_in')
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
