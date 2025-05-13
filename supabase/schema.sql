
-- Create schema for warden management
CREATE SCHEMA IF NOT EXISTS warden_base;

-- Create wardens table
CREATE TABLE IF NOT EXISTS warden_base.wardens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  area VARCHAR(100) NOT NULL,
  contact VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS warden_base.tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  location VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add is_admin column to auth.users if it doesn't exist
ALTER TABLE IF EXISTS auth.users 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Insert sample warden records
INSERT INTO warden_base.wardens (name, position, area, contact)
VALUES 
  ('John Doe', 'Head Warden', 'Main Building', '+255 123 456 789'),
  ('Jane Smith', 'Assistant Warden', 'Dormitories', '+255 987 654 321'),
  ('Michael Johnson', 'Security Warden', 'Campus Perimeter', '+255 456 789 123');

-- Insert sample tool records
INSERT INTO warden_base.tools (name, category, quantity, location)
VALUES 
  ('Fire Extinguisher', 'Safety', 15, 'Main Building'),
  ('First Aid Kit', 'Medical', 8, 'Each Floor'),
  ('Walkie Talkie', 'Communication', 10, 'Security Office');
