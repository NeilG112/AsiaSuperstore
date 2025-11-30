const { Pool } = require('pg')

let pool = null

if (process.env.VITE_NEON_DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.VITE_NEON_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

/**
 * Delete a product
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

    if (!pool) {
        return {
            statusCode: 503,
            headers,
            body: JSON.stringify({ error: 'Database not configured' })
        }
    }

    try {
        const { id } = event.queryStringParameters

        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Product not found' })
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Product deleted successfully' })
        }
    } catch (error) {
        console.error('Error deleting product:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to delete product',
                details: error.message
            })
        }
    }
}
