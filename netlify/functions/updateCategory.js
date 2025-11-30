const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Update an existing category
 * Requires authentication
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

    if (!context.clientContext || !context.clientContext.user) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Unauthorized' })
        }
    }

    try {
        const data = JSON.parse(event.body)
        const { id, name, slug, short_description, image, icon } = data

        const result = await pool.query(
            `UPDATE categories 
       SET name = $1, slug = $2, short_description = $3, image = $4, icon = $5 
       WHERE id = $6 
       RETURNING *`,
            [name, slug, short_description, image || '', icon || '', id]
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
            body: JSON.stringify(result.rows[0])
        }
    } catch (error) {
        console.error('Error updating category:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to update category' })
        }
    }
}
