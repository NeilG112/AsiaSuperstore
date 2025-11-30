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
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
    }

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' }
    }

    if (!pool) {
        return {
            statusCode: 503,
            headers,
            body: JSON.stringify({ error: 'Database not configured' })
        }
    }

    try {
        const data = JSON.parse(event.body)
        // data should be an array of { key, value } or a single object
        // Let's support array for bulk updates
        const updates = Array.isArray(data) ? data : [data]

        for (const item of updates) {
            await pool.query(
                'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
                [item.key, item.value]
            )
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Settings updated successfully' })
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        }
    }
}
