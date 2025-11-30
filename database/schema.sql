-- Asian Superstore Database Schema for Neon (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  image TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  valid_until DATE NOT NULL,
  image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_offers_valid_until ON offers(valid_until);
CREATE INDEX IF NOT EXISTS idx_offers_category_id ON offers(category_id);

-- Insert sample categories
INSERT INTO categories (id, name, slug, short_description, icon) VALUES
  ('fresh-fruit', 'Frisches Obst', 'frisches-obst', 'Täglich frische Früchte aus der Region und Asien.', '🍎'),
  ('vegetables', 'Gemüse & Salate', 'gemuese-salate', 'Knackiges Gemüse und frische Salate für jeden Tag.', '🥬'),
  ('rice-noodles', 'Reis & Nudeln', 'reis-nudeln', 'Vielfältige Auswahl an Reis- und Nudelsorten.', '🍚'),
  ('spices', 'Gewürze & Saucen', 'gewuerze-saucen', 'Authentische asiatische Gewürze und Saucen.', '🌶️'),
  ('tea-drinks', 'Tee & Getränke', 'tee-getraenke', 'Erlesene Teesorten und asiatische Getränke.', '🍵'),
  ('frozen', 'Tiefkühlprodukte', 'tiefkuehl', 'Hochwertige Tiefkühlprodukte und Fertiggerichte.', '❄️')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample offers
INSERT INTO offers (id, title, description, price, old_price, valid_until, category_id) VALUES
  ('offer-001', 'Mangos (1kg)', 'Saftige Alphonso Mangos, Sonderpreis diese Woche.', 4.99, 6.99, '2025-12-07', 'fresh-fruit'),
  ('offer-002', 'Jasmin Reis (5kg)', 'Premium Jasmin Reis aus Thailand.', 12.99, 15.99, '2025-12-10', 'rice-noodles'),
  ('offer-003', 'Soja Sauce Set', '3er Set verschiedene Soja Saucen.', 8.99, 11.99, '2025-12-15', 'spices'),
  ('offer-004', 'Pak Choi (Bund)', 'Frischer Pak Choi aus regionalem Anbau.', 1.99, 2.99, '2025-12-05', 'vegetables'),
  ('offer-005', 'Grüner Tee Premium', '100g Premium Sencha Grüntee aus Japan.', 9.99, 13.99, '2025-12-20', 'tea-drinks'),
  ('offer-006', 'Gyoza Teigtaschen', 'Vegetarische Gyoza, 500g Packung.', 5.49, 7.49, '2025-12-12', 'frozen')
ON CONFLICT (id) DO NOTHING;
