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
 * Update an existing product
 */
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT, OPTIONS'
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
        const { id, name, description, price, image, category_id, in_stock } = data

        const result = await pool.query(
            `UPDATE products 
       SET name = $1, description = $2, price = $3, image = $4, category_id = $5, in_stock = $6
       WHERE id = $7 
       RETURNING *`,
            [name, description || '', parseFloat(price), image || '', category_id, in_stock !== false, id]
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
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error updating product:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to update product',
                details: error.message
            })
        }
    }
}
