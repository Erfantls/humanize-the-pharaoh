
-- Create table for usage logs with more detailed tracking
CREATE TABLE IF NOT EXISTS public.detailed_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  characters_used INTEGER NOT NULL,
  mode_used TEXT DEFAULT 'standard',
  input_text_length INTEGER,
  output_text_length INTEGER,
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on detailed usage logs
ALTER TABLE public.detailed_usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for detailed usage logs
CREATE POLICY "Users can view their own detailed usage logs"
  ON public.detailed_usage_logs
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can insert detailed usage logs"
  ON public.detailed_usage_logs
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Create table for referrals
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  reward_granted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS on referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Users can view their own referrals"
  ON public.referrals
  FOR SELECT
  USING (referrer_id = auth.uid());

CREATE POLICY "Users can create referrals"
  ON public.referrals
  FOR INSERT
  WITH CHECK (referrer_id = auth.uid());

-- Create table for email captures
CREATE TABLE IF NOT EXISTS public.email_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'newsletter',
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on email captures
ALTER TABLE public.email_captures ENABLE ROW LEVEL SECURITY;

-- Create policy for email captures (public insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.email_captures
  FOR INSERT
  WITH CHECK (true);

-- Add humanization mode to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferred_mode TEXT DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS bonus_uses INTEGER DEFAULT 0;

-- Create function to generate referral codes
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.referral_code = 'REF' || UPPER(substring(NEW.id::text from 1 for 8));
  RETURN NEW;
END;
$$;

-- Create trigger for referral code generation
DROP TRIGGER IF EXISTS generate_referral_code_trigger ON public.profiles;
CREATE TRIGGER generate_referral_code_trigger
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Update existing profiles without referral codes
UPDATE public.profiles 
SET referral_code = 'REF' || UPPER(substring(id::text from 1 for 8))
WHERE referral_code IS NULL;
