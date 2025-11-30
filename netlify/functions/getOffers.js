const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.VITE_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

/**
 * Get all offers from database
 */
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    try {
        const result = await pool.query(
            'SELECT * FROM offers ORDER BY valid_until ASC'
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
                id: 'offer-001',
                title: 'Mangos (1kg)',
                description: 'Saftige Alphonso Mangos, Sonderpreis diese Woche.',
                price: 4.99,
                old_price: 6.99,
                valid_until: '2025-12-07',
                image: '/assets/images/mango.jpg',
                category_id: 'fresh-fruit'
            },
            {
                id: 'offer-002',
                title: 'Jasmin Reis (5kg)',
                description: 'Premium Jasmin Reis aus Thailand.',
                price: 12.99,
                old_price: 15.99,
                valid_until: '2025-12-10',
                image: '/assets/images/jasmin-rice.jpg',
                category_id: 'rice-noodles'
            },
            {
                id: 'offer-003',
                title: 'Soja Sauce Set',
                description: '3er Set verschiedene Soja Saucen.',
                price: 8.99,
                old_price: 11.99,
                valid_until: '2025-12-15',
                image: '/assets/images/soy-sauce.jpg',
                category_id: 'spices'
            },
            {
                id: 'offer-004',
                title: 'Pak Choi (Bund)',
                description: 'Frischer Pak Choi aus regionalem Anbau.',
                price: 1.99,
                old_price: 2.99,
                valid_until: '2025-12-05',
                image: '/assets/images/pak-choi.jpg',
                category_id: 'vegetables'
            },
            {
                id: 'offer-005',
                title: 'Grüner Tee Premium',
                description: '100g Premium Sencha Grüntee aus Japan.',
                price: 9.99,
                old_price: 13.99,
                valid_until: '2025-12-20',
                image: '/assets/images/green-tea.jpg',
                category_id: 'tea-drinks'
            },
            {
                id: 'offer-006',
                title: 'Gyoza Teigtaschen',
                description: 'Vegetarische Gyoza, 500g Packung.',
                price: 5.49,
                old_price: 7.49,
                valid_until: '2025-12-12',
                image: '/assets/images/gyoza.jpg',
                category_id: 'frozen'
            }
        ]

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(mockData)
        }
    }
}
