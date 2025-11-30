const { Pool } = require('pg')

let pool = null

// Only create pool if database URL is configured
if (process.env.VITE_NEON_DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.VITE_NEON_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

/**
 * Delete a category
 */
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
    }

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    // If no database configured, return error
    if (!pool) {
        return {
            statusCode: 503,
            headers,
            body: JSON.stringify({
                error: 'Database not configured',
                message: 'Please set VITE_NEON_DATABASE_URL environment variable'
            })
        }
    }

    try {
        const { id } = event.queryStringParameters

        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Category not found' })
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Category deleted successfully' })
        }
    } catch (error) {
        console.error('Error deleting category:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to delete category',
                details: error.message
            })
        }
    }
}
