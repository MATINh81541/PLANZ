/*
# Create profiles table for PLANZ user accounts

## Purpose
Stores user profile information (first name, last name) linked to Supabase's
built-in auth.users table. Authentication (email, password hashing, sessions)
is handled by Supabase Auth — passwords are NEVER stored in this table or in
plaintext. The auth.users table holds the hashed password securely.

## New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users.id ON DELETE CASCADE)
  - `first_name` (text, not null)
  - `last_name` (text, not null)
  - `email` (text, not null, unique — mirrors auth.users email for convenience)
  - `created_at` (timestamptz, defaults to now())

## Security
- RLS enabled on `profiles`.
- Users can only SELECT and UPDATE their own profile row (matched by auth.uid() = id).
- INSERT is handled by a trigger when a new auth user signs up — users do NOT
  insert directly into profiles. The trigger runs with SECURITY DEFINER so it
  can write to the table regardless of RLS.
- No DELETE policy: profiles are removed via CASCADE when the auth user is deleted.

## Important Notes
1. The `handle_new_user` trigger function is SECURITY DEFINER so it can insert
   into profiles even though RLS would block direct inserts from the client.
2. The trigger fires AFTER INSERT on auth.users, capturing the email and
   user_metadata (first_name, last_name) from the sign-up call.
3. Email is stored in profiles for convenience but the source of truth is auth.users.
*/
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Trigger function: creates a profile row when a new auth user signs up.
-- Reads first_name and last_name from the user_metadata passed during signUp.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
