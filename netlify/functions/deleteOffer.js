const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Delete an offer
 * Requires authentication
 */
exports.handler = async (event, context) => {
    const headers = {

        if(result.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Offer not found' })
}
        }

return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Offer deleted successfully' })
}
    } catch (error) {
    console.error('Error deleting offer:', error)
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to delete offer' })
    }
}
}
