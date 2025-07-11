export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      abuse_reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          input_text: string
          output_text: string
          report_details: string | null
          report_reason: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          input_text: string
          output_text: string
          report_details?: string | null
          report_reason: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          input_text?: string
          output_text?: string
          report_details?: string | null
          report_reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "abuse_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      detailed_usage_logs: {
        Row: {
          characters_used: number
          created_at: string
          id: string
          input_text_length: number | null
          mode_used: string | null
          output_text_length: number | null
          processing_time_ms: number | null
          user_id: string
        }
        Insert: {
          characters_used: number
          created_at?: string
          id?: string
          input_text_length?: number | null
          mode_used?: string | null
          output_text_length?: number | null
          processing_time_ms?: number | null
          user_id: string
        }
        Update: {
          characters_used?: number
          created_at?: string
          id?: string
          input_text_length?: number | null
          mode_used?: string | null
          output_text_length?: number | null
          processing_time_ms?: number | null
          user_id?: string
        }
        Relationships: []
      }
      email_captures: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
          subscribed: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
        }
        Relationships: []
      }
      grammar_suggestions: {
        Row: {
          applied: boolean | null
          confidence_score: number | null
          created_at: string
          id: string
          original_text: string
          position_end: number
          position_start: number
          suggestion: string
          suggestion_type: string
          user_id: string | null
        }
        Insert: {
          applied?: boolean | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          original_text: string
          position_end: number
          position_start: number
          suggestion: string
          suggestion_type: string
          user_id?: string | null
        }
        Update: {
          applied?: boolean | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          original_text?: string
          position_end?: number
          position_start?: number
          suggestion?: string
          suggestion_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      in_app_purchases: {
        Row: {
          created_at: string
          currency: string | null
          id: string
          price: number
          purchase_type: string
          quantity: number
          status: string | null
          stripe_payment_intent_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          id?: string
          price: number
          purchase_type: string
          quantity: number
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          id?: string
          price?: number
          purchase_type?: string
          quantity?: number
          status?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_proofs: {
        Row: {
          admin_notes: string | null
          amount: number | null
          currency: string
          id: string
          proof_image_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submitted_at: string
          transaction_hash: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          currency?: string
          id?: string
          proof_image_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          transaction_hash?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          currency?: string
          id?: string
          proof_image_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string
          transaction_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_proofs_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_proofs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bonus_uses: number | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          monthly_usage_count: number
          preferred_mode: string | null
          referral_code: string | null
          updated_at: string
          usage_reset_date: string
          user_type: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bonus_uses?: number | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          monthly_usage_count?: number
          preferred_mode?: string | null
          referral_code?: string | null
          updated_at?: string
          usage_reset_date?: string
          user_type?: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bonus_uses?: number | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          monthly_usage_count?: number
          preferred_mode?: string | null
          referral_code?: string | null
          updated_at?: string
          usage_reset_date?: string
          user_type?: string
          website?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          reward_granted: boolean | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          reward_granted?: boolean | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          reward_granted?: boolean | null
          status?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          character_limit: number | null
          created_at: string
          currency: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          monthly_uses: number | null
          name: string
          price: number
          stripe_price_id: string | null
        }
        Insert: {
          character_limit?: number | null
          created_at?: string
          currency?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          monthly_uses?: number | null
          name: string
          price: number
          stripe_price_id?: string | null
        }
        Update: {
          character_limit?: number | null
          created_at?: string
          currency?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          monthly_uses?: number | null
          name?: string
          price?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          characters_used: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          characters_used: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          characters_used?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analytics: {
        Row: {
          characters_processed: number | null
          created_at: string
          daily_uses: number | null
          date: string
          id: string
          last_active: string | null
          session_duration: number | null
          user_id: string | null
        }
        Insert: {
          characters_processed?: number | null
          created_at?: string
          daily_uses?: number | null
          date?: string
          id?: string
          last_active?: string | null
          session_duration?: number | null
          user_id?: string | null
        }
        Update: {
          characters_processed?: number | null
          created_at?: string
          daily_uses?: number | null
          date?: string
          id?: string
          last_active?: string | null
          session_duration?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_monthly_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_analytics: {
        Args: {
          p_user_id: string
          p_characters_processed?: number
          p_session_duration?: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
