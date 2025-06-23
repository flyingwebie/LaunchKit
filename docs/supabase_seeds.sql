-- 1. In Supabase SQL Editor, run this query to add a profiles table (an extension of the authenticated user to store data like Stripe customer_id, subscription access, etc...):
-- Create the profiles table in the public schema
CREATE TABLE public.profiles (
id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
name TEXT,
email TEXT,
image TEXT,
customer_id TEXT,
price_id TEXT,
has_access BOOLEAN DEFAULT false,
created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = (now() AT TIME ZONE 'UTC');
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create a function to automatically add a profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS
$$

BEGIN
INSERT INTO public.profiles (id, email, name, image, created_at, updated_at)
VALUES (
NEW.id,
NEW.email,
COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
NEW.raw_user_meta_data->>'avatar_url',
(now() AT TIME ZONE 'UTC'),
(now() AT TIME ZONE 'UTC')
);
RETURN NEW;
END;

$$
LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the handle_new_user function on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. (Optional, but highly recommended) Add RLS policies to the profiles table to prevent users from accessing or updating other users' data. This is a security best practice.
-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to read their own data
CREATE POLICY read_own_profile_data ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Create a policy to allow users to update their own data
CREATE POLICY update_own_profile_data ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create a policy to allow users to insert their own data
CREATE POLICY insert_own_profile_data ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create a policy to allow users to delete their own data
CREATE POLICY delete_own_profile_data ON public.profiles
FOR DELETE
USING (auth.uid() = id);

-- 3. (Optional) If you want to collect leads with ButtonLead, create a new table called leads and add a RLS policy with insert access for anyone:
-- Create the leads table
create table public.leads (
  id uuid default gen_random_uuid(),
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key (id)
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Create a policy to allow anyone to insert data
create policy insert_lead on public.leads
for insert
to public
with check (true);
