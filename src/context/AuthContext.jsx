import { createContext, useContext, useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

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
        // Initialize Netlify Identity
        netlifyIdentity.init()

        // Check for existing user
        const currentUser = netlifyIdentity.currentUser()
        setUser(currentUser)
        setLoading(false)

        // Listen for auth events
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()
        })

        netlifyIdentity.on('logout', () => {
            setUser(null)
        })

        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

    const login = () => {
        netlifyIdentity.open('login')
    }

    const logout = () => {
        netlifyIdentity.logout()
    }

    const signup = () => {
        netlifyIdentity.open('signup')
    }

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
        isAuthenticated: !!user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
