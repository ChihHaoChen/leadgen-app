-- Create dojos table
CREATE TABLE IF NOT EXISTS dojos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) NOT NULL UNIQUE,
  address TEXT,
  phone VARCHAR(50),
  email_from VARCHAR(255),
  twilio_account_sid VARCHAR(255),
  twilio_auth_token VARCHAR(255),
  twilio_phone_number VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dojo_id UUID NOT NULL REFERENCES dojos(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dojos_subdomain ON dojos(subdomain);
CREATE INDEX IF NOT EXISTS idx_leads_dojo_id ON leads(dojo_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Seed: Espada BJJ Hong Kong (first customer)
INSERT INTO dojos (name, subdomain, address, phone, email_from)
VALUES (
  'Espada BJJ Hong Kong',
  'espada',
  'Hong Kong',
  '+852 0000 0000',
  'info@espadabjj.com'
)
ON CONFLICT (subdomain) DO NOTHING;
