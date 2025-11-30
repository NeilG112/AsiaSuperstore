const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Update an existing offer
 * Requires authentication
 */
exports.handler = async (event, context) => {
    const headers = {
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
