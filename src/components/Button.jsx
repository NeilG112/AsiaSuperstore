import { Link } from 'react-router-dom'

/**
 * Reusable Button Component
 * @param {string} variant - 'primary' or 'secondary'
 * @param {string} to - Optional link destination
 * @param {function} onClick - Optional click handler
 * @param {React.ReactNode} children - Button content
 */
const Button = ({ variant = 'primary', to, onClick, children, className = '', type = 'button' }) => {
    const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
    const combinedClasses = `${baseClasses} ${className}`

    if (to) {
        return (
            <Link to={to} className={combinedClasses}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    )
}

export default Button
