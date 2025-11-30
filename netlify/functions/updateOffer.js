const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

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

    try {
        const data = JSON.parse(event.body)
        const { id, title, description, price, old_price, valid_until, image, category_id } = data

        const result = await pool.query(
            `UPDATE offers 
       SET title = $1, description = $2, price = $3, old_price = $4, 
           valid_until = $5, image = $6, category_id = $7 
       WHERE id = $8 
       RETURNING *`,
            [title, description, price, old_price || null, valid_until, image || '', category_id, id]
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
            body: JSON.stringify({ error: 'Failed to update offer' })
        }
    }
}
