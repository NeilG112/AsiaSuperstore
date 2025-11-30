const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

exports.handler = async (event, context) => {
    try {
        // Create table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(50) PRIMARY KEY,
        value TEXT
      );
    `)

        // Insert defaults
        const defaults = [
            { key: 'opening_hours_week', value: 'Mo - Sa: 09:00 - 20:00' },
            { key: 'opening_hours_sunday', value: 'So: Geschlossen' },
            { key: 'phone', value: '+49 123 456789' },
            { key: 'email', value: 'info@asia-superstore.de' },
            { key: 'address', value: 'Musterstraße 123, 12345 Berlin' }
        ]

        for (const item of defaults) {
            await pool.query(
                'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
                [item.key, item.value]
            )
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Settings table created and defaults inserted' })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}
