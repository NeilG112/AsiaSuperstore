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
 * Get all products
 */
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    if (!pool) {
        // Fallback to mock data
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify([])
        }
    }

    try {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       ORDER BY p.name ASC`
        )

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows)
        }
    } catch (error) {
        console.error('Database error:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to fetch products',
                details: error.message
            })
        }
    }
}
