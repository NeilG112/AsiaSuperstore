const { Pool } = require('pg')

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Get all categories from database
 * Fallback to mock data if database unavailable
 */
exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    try {
        // Try to fetch from database
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY name ASC'
        )

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows)
        }
    } catch (error) {
        console.error('Database error:', error)

        // Fallback to mock data
        const mockData = [
            {
                id: 'fresh-fruit',
                name: 'Frisches Obst',
                slug: 'frisches-obst',
                short_description: 'Täglich frische Früchte aus der Region und Asien.',
                image: '/assets/images/fruits.jpg',
                icon: '🍎'
            },
            {
                id: 'vegetables',
                name: 'Gemüse & Salate',
                slug: 'gemuese-salate',
                short_description: 'Knackiges Gemüse und frische Salate für jeden Tag.',
                image: '/assets/images/vegetables.jpg',
                icon: '🥬'
            },
            {
                id: 'rice-noodles',
                name: 'Reis & Nudeln',
                slug: 'reis-nudeln',
                short_description: 'Vielfältige Auswahl an Reis- und Nudelsorten.',
                image: '/assets/images/rice.jpg',
                icon: '🍚'
            },
            {
                id: 'spices',
                name: 'Gewürze & Saucen',
                slug: 'gewuerze-saucen',
                short_description: 'Authentische asiatische Gewürze und Saucen.',
                image: '/assets/images/spices.jpg',
                icon: '🌶️'
            },
            {
                id: 'tea-drinks',
                name: 'Tee & Getränke',
                slug: 'tee-getraenke',
                short_description: 'Erlesene Teesorten und asiatische Getränke.',
                image: '/assets/images/tea.jpg',
                icon: '🍵'
            },
            {
                id: 'frozen',
                name: 'Tiefkühlprodukte',
                slug: 'tiefkuehl',
                short_description: 'Hochwertige Tiefkühlprodukte und Fertiggerichte.',
                image: '/assets/images/frozen.jpg',
                icon: '❄️'
            }
        ]

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(mockData)
        }
    }
}
