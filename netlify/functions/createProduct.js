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
 * Create a new product
 */
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
        const data = JSON.parse(event.body)
        const { name, description, price, image, category_id, in_stock } = data

        // Generate simple ID
        const id = 'prod-' + Date.now()

        const result = await pool.query(
            `INSERT INTO products (id, name, description, price, image, category_id, in_stock) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
            [id, name, description || '', parseFloat(price), image || '', category_id, in_stock !== false]
        )

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error creating product:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to create product',
                details: error.message
            })
        }
    }
}
