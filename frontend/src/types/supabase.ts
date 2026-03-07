export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type GiftCardStatus = 'active' | 'redeemed' | 'cancelled' | 'expired';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type ProductType = 'gift_card' | 'retail_product' | 'service';

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          full_name: string;
          email: string;
          phone: string | null;
          notes: string | null;
          newsletter_opt_in: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          full_name: string;
          email: string;
          phone?: string | null;
          notes?: string | null;
          newsletter_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          notes?: string | null;
          newsletter_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gift_cards: {
        Row: {
          id: string;
          code: string;
          customer_id: string | null;
          customer_email: string;
          amount_mxn: number;
          currency: string;
          qr_value: string | null;
          status: GiftCardStatus;
          message: string | null;
          recipient_name: string | null;
          purchased_at: string | null;
          redeemed_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          customer_id?: string | null;
          customer_email: string;
          amount_mxn: number;
          currency?: string;
          qr_value?: string | null;
          status?: GiftCardStatus;
          message?: string | null;
          recipient_name?: string | null;
          purchased_at?: string | null;
          redeemed_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          customer_id?: string | null;
          customer_email?: string;
          amount_mxn?: number;
          currency?: string;
          qr_value?: string | null;
          status?: GiftCardStatus;
          message?: string | null;
          recipient_name?: string | null;
          purchased_at?: string | null;
          redeemed_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'gift_cards_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          customer_id: string | null;
          gift_card_id: string | null;
          product_id: string | null;
          amount_mxn: number;
          currency: string;
          provider: string;
          provider_reference: string | null;
          payment_status: PaymentStatus;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          gift_card_id?: string | null;
          product_id?: string | null;
          amount_mxn: number;
          currency?: string;
          provider: string;
          provider_reference?: string | null;
          payment_status?: PaymentStatus;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          gift_card_id?: string | null;
          product_id?: string | null;
          amount_mxn?: number;
          currency?: string;
          provider?: string;
          provider_reference?: string | null;
          payment_status?: PaymentStatus;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payments_gift_card_id_fkey';
            columns: ['gift_card_id'];
            referencedRelation: 'gift_cards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payments_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          product_type: ProductType;
          price_mxn: number;
          active: boolean;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          product_type: ProductType;
          price_mxn: number;
          active?: boolean;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          product_type?: ProductType;
          price_mxn?: number;
          active?: boolean;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          source: string | null;
          consent: boolean;
          subscribed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          source?: string | null;
          consent?: boolean;
          subscribed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          source?: string | null;
          consent?: boolean;
          subscribed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gift_card_redemptions: {
        Row: {
          id: string;
          gift_card_id: string;
          redeemed_amount_mxn: number;
          redeemed_at: string;
          redeemed_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          gift_card_id: string;
          redeemed_amount_mxn: number;
          redeemed_at?: string;
          redeemed_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          gift_card_id?: string;
          redeemed_amount_mxn?: number;
          redeemed_at?: string;
          redeemed_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'gift_card_redemptions_gift_card_id_fkey';
            columns: ['gift_card_id'];
            referencedRelation: 'gift_cards';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type SupabaseTableName = keyof Database['public']['Tables'];
