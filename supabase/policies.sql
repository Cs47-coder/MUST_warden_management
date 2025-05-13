
-- Enable Row Level Security (RLS)
ALTER TABLE warden_base.wardens ENABLE ROW LEVEL SECURITY;
ALTER TABLE warden_base.tools ENABLE ROW LEVEL SECURITY;

-- Create policies for wardens table
-- Allow anyone to view wardens
CREATE POLICY "Allow anyone to view wardens" 
  ON warden_base.wardens
  FOR SELECT USING (true);

-- Allow only authenticated admins to insert, update, delete wardens
CREATE POLICY "Allow admins to insert wardens" 
  ON warden_base.wardens
  FOR INSERT 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Allow admins to update wardens" 
  ON warden_base.wardens
  FOR UPDATE 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Allow admins to delete wardens" 
  ON warden_base.wardens
  FOR DELETE 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));

-- Create policies for tools table
-- Allow anyone to view tools
CREATE POLICY "Allow anyone to view tools" 
  ON warden_base.tools
  FOR SELECT USING (true);

-- Allow only authenticated admins to insert, update, delete tools
CREATE POLICY "Allow admins to insert tools" 
  ON warden_base.tools
  FOR INSERT 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Allow admins to update tools" 
  ON warden_base.tools
  FOR UPDATE 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Allow admins to delete tools" 
  ON warden_base.tools
  FOR DELETE 
  TO authenticated
  USING ((SELECT is_admin FROM auth.users WHERE id = auth.uid()));
