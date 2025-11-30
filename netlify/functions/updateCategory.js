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
