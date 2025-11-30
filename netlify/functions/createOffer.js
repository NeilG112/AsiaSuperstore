const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Create a new offer
 * Requires authentication
 */
exports.handler = async (event, context) => {
    const headers = {
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
