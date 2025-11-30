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
 * Update an existing offer
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
        const { id, product_id, new_price, valid_until } = data

        // Get product to calculate discount
        const productResult = await pool.query(
            'SELECT price FROM products WHERE id = $1',
            [product_id]
        )

        if (productResult.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Product not found' })
            }
        }

        const oldPrice = parseFloat(productResult.rows[0].price)
        const newPriceFloat = parseFloat(new_price)
        const discountPercent = Math.round(((oldPrice - newPriceFloat) / oldPrice) * 100)

        const result = await pool.query(
            `UPDATE offers 
       SET product_id = $1, discount_percent = $2, new_price = $3, valid_until = $4
       WHERE id = $5 
       RETURNING *`,
            [product_id, discountPercent, newPriceFloat, valid_until, id]
        )

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Offer not found' })
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error updating offer:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to update offer',
                details: error.message
            })
        }
    }
}
