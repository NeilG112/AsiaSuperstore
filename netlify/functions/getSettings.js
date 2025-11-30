const { Pool } = require('pg')

const pool = process.env.VITE_NEON_DATABASE_URL ? new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}) : null

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' }
    }

    if (!pool) {
        // Fallback mock data
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify([
                { key: 'opening_hours_week', value: 'Mo - Sa: 09:00 - 20:00' },
                { key: 'opening_hours_sunday', value: 'So: Geschlossen' },
                { key: 'phone', value: '+49 123 456789' }
            ])
        }
    }

    try {
        const result = await pool.query('SELECT * FROM settings')
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows)
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        }
    }
}
