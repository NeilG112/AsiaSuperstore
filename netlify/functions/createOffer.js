const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Create a new offer
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

    try {
        const data = JSON.parse(event.body)
        const { title, description, price, old_price, valid_until, image, category_id } = data

        const result = await pool.query(
            `INSERT INTO offers (id, title, description, price, old_price, valid_until, image, category_id) 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
            [title, description, price, old_price || null, valid_until, image || '', category_id]
        )

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error creating offer:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create offer' })
        }
    }
}
