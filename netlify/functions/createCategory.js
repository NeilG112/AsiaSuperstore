const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Create a new category
 * Requires authentication
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

    // Check authentication
    if (!context.clientContext || !context.clientContext.user) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Unauthorized' })
        }
    }

    try {
        const data = JSON.parse(event.body)
        const { name, slug, short_description, image, icon } = data

        const result = await pool.query(
            `INSERT INTO categories (id, name, slug, short_description, image, icon) 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) 
       RETURNING *`,
            [name, slug, short_description, image || '', icon || '']
        )

        return {
            statusCode: 201,
            headers,
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error creating category:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create category' })
        }
    }
}
