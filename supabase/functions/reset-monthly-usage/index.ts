
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    console.log("Starting monthly usage reset...");

    // Reset usage for users whose reset date has passed
    const { data, error } = await supabaseService
      .from("profiles")
      .update({
        monthly_usage_count: 0,
        usage_reset_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()
      })
      .lte("usage_reset_date", new Date().toISOString())
      .select("id, email, monthly_usage_count");

    if (error) {
      console.error("Error resetting usage:", error);
      throw error;
    }

    console.log(`Reset usage for ${data?.length || 0} users`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reset usage for ${data?.length || 0} users`,
        resetUsers: data?.length || 0
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in reset-monthly-usage function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
