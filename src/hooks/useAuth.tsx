
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  user_type: 'standard' | 'premium' | 'admin';
  monthly_usage_count: number;
  usage_reset_date: string;
  avatar_url?: string | null;
  website?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth cleanup utility
const cleanupAuthState = () => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning up auth state:', error);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, try to create it
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating new profile...');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: user?.email || '',
              full_name: user?.user_metadata?.full_name || null,
              user_type: 'standard',
              monthly_usage_count: 0
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating profile:', createError);
          } else if (newProfile) {
            console.log('Profile created successfully:', newProfile);
            const profileData: Profile = {
              id: newProfile.id,
              email: newProfile.email,
              full_name: newProfile.full_name,
              user_type: newProfile.user_type as 'standard' | 'premium' | 'admin',
              monthly_usage_count: newProfile.monthly_usage_count,
              usage_reset_date: newProfile.usage_reset_date,
              avatar_url: newProfile.avatar_url,
              website: newProfile.website
            };
            setProfile(profileData);
          }
        }
        return;
      }

      if (data) {
        console.log('Profile fetched successfully:', data);
        const profileData: Profile = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          user_type: data.user_type as 'standard' | 'premium' | 'admin',
          monthly_usage_count: data.monthly_usage_count,
          usage_reset_date: data.usage_reset_date,
          avatar_url: data.avatar_url,
          website: data.website
        };
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          // Defer profile fetch to prevent conflicts
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        console.log('Initial session check:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    console.log('Attempting sign up for:', email);
    
    try {
      // Clean up any existing auth state
      cleanupAuthState();
      
      // Sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('No existing session to sign out');
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: fullName ? { full_name: fullName } : undefined
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Sign up exception:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    
    try {
      // Clean up any existing auth state
      cleanupAuthState();
      
      // Sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('No existing session to sign out');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful:', data);
      return { error: null };
    } catch (error) {
      console.error('Sign in exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    
    try {
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clean up state
      cleanupAuthState();
      setUser(null);
      setSession(null);
      setProfile(null);
      
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      // Clean up state even if signout fails
      cleanupAuthState();
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  const contextValue = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
