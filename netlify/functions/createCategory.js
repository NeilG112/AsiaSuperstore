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
